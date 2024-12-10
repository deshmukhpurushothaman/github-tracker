/**
 * Resolvers for handling GitHub repository data and releases in the database.
 *
 * This file contains GraphQL resolvers for fetching repositories, adding new repositories,
 * marking releases as seen, and refreshing repository data. It integrates with the GitHub API
 * via Octokit to fetch repository and release information.
 *
 * Functions:
 * - `fetchAndStoreReleases`: Fetches releases from GitHub and stores them in the database.
 * - Query resolvers: Handle fetching repository data from the database.
 * - Mutation resolvers: Allow adding new repositories, marking releases as seen, and refreshing repository data.
 *
 * Dependencies:
 * - Database connection (`pool`) for PostgreSQL operations.
 * - Octokit for GitHub API integration.
 */

import { pool } from '../database/connection';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Fetches releases from GitHub for a specific repository and stores them in the database.
 *
 * @param {string} repositoryId - The ID of the repository in the database.
 * @param {string} owner - The owner of the repository on GitHub.
 * @param {string} repoName - The name of the repository on GitHub.
 */
async function fetchAndStoreReleases(
  repositoryId: string,
  owner: string,
  repoName: string
) {
  try {
    const releases = await octokit.repos.listReleases({
      owner,
      repo: repoName,
    });

    for (const release of releases.data) {
      await pool.query(
        `INSERT INTO releases (repository_id, version, release_date)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [repositoryId, release.tag_name, release.published_at]
      );
    }
    console.info(
      `Releases for repository ${repositoryId} updated successfully.`
    );
  } catch (error) {
    console.error(
      `Failed to fetch or store releases for repository ${repositoryId}: ${error.message}`
    );
  }
}

export const resolvers = {
  Query: {
    /**
     * Fetches all repositories from the database, including their releases.
     *
     * @returns {Promise<Array>} List of repositories with their associated releases.
     */
    getRepositories: async () => {
      const result = await pool.query(`
        SELECT id, name, url, description FROM repositories
      `);
      const repositories = result.rows;

      for (const repo of repositories) {
        const releasesResult = await pool.query(
          `
          SELECT id, version, release_date, seen FROM releases WHERE repository_id = $1
        `,
          [repo.id]
        );
        repo.releases = releasesResult.rows;
      }

      return repositories;
    },
  },

  Mutation: {
    /**
     * Adds a new repository by fetching its details from GitHub.
     *
     * If the repository already exists in the database, it returns the existing entry.
     * Otherwise, it fetches the repository details and stores them in the database.
     * The fetching of releases is performed in the background.
     *
     * @param {object} _ - Unused.
     * @param {object} args - The arguments for the mutation.
     * @param {string} args.url - The URL of the GitHub repository.
     * @returns {Promise<object>} The repository data.
     */
    addRepository: async (_: any, { url }: { url: string }): Promise<any> => {
      try {
        const [owner, repoName] = url
          .replace('https://github.com/', '')
          .split('/');

        const existingRepoResult = await pool.query(
          `SELECT id, name, url, description FROM repositories WHERE url = $1`,
          [url]
        );

        if (existingRepoResult.rowCount > 0) {
          console.info(`${url} already exists.`);
          return existingRepoResult.rows[0];
        }

        const { data } = await octokit.repos.get({ owner, repo: repoName });

        const result = await pool.query(
          `INSERT INTO repositories (name, url, description) VALUES ($1, $2, $3) RETURNING id`,
          [data.name, url, data.description]
        );

        const repositoryId = result.rows[0].id;

        // Run the release fetching task in the background
        setImmediate(() =>
          fetchAndStoreReleases(repositoryId, owner, repoName)
        );

        return {
          id: repositoryId,
          name: data.name,
          url,
          description: data.description,
          releases: [],
        };
      } catch (error) {
        console.log('error ', error);
        throw new Error('Failed to add repository');
      }
    },

    /**
     * Marks a specific release as seen in the database.
     *
     * @param {object} _ - Unused.
     * @param {object} args - The arguments for the mutation.
     * @param {string} args.releaseId - The ID of the release to mark as seen.
     * @returns {Promise<object>} The updated release data.
     */
    markReleaseAsSeen: async (_: any, { releaseId }: { releaseId: string }) => {
      const result = await pool.query(
        `UPDATE releases SET seen = TRUE WHERE id = $1 RETURNING *`,
        [releaseId]
      );
      return result.rows[0];
    },

    /**
     * Refreshes a repository's release data by fetching new releases from GitHub.
     *
     * @param {object} _ - Unused.
     * @param {object} args - The arguments for the mutation.
     * @param {string} args.repositoryId - The ID of the repository to refresh.
     * @returns {Promise<object>} The repository data.
     */
    refreshRepository: async (
      _: any,
      { repositoryId }: { repositoryId: string }
    ) => {
      const repository = await pool.query(
        `SELECT * FROM repositories WHERE id = $1`,
        [repositoryId]
      );

      if (!repository.rows.length) throw new Error('Repository not found.');

      const { name, url } = repository.rows[0];
      const [owner, repoName] = url
        .replace('https://github.com/', '')
        .split('/');

      const releases = await octokit.repos.listReleases({
        owner,
        repo: repoName,
      });

      for (const release of releases.data) {
        await pool.query(
          `INSERT INTO releases (repository_id, version, release_date)
           VALUES ($1, $2, $3)
           ON CONFLICT DO NOTHING`,
          [repositoryId, release.tag_name, release.published_at]
        );
      }

      return repository.rows[0];
    },
  },
};

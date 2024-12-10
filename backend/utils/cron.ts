import cron from 'node-cron';
import { pool } from '../database/connection';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Cron job to periodically sync GitHub release data for all repositories in the database.
 * The job runs at the start of every hour.
 */
export const refreshRepositoriesByCron = cron.schedule(
  '0 * * * *',
  async () => {
    try {
      const repositories = await pool.query('SELECT * FROM repositories');
      for (const repo of repositories.rows) {
        const [owner, repoName] = repo.url
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
            [repo.id, release.tag_name, release.published_at]
          );
        }
      }
      console.log('[CRON] Periodic sync completed.');
    } catch (error) {
      console.error(`[CRON] Unexpected error occurred: ${error.message}`);
    }
  }
);

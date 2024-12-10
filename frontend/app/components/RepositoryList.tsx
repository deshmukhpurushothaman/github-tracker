import RepositoryCard from './RepositoryCard';

interface Release {
  id: string;
  version: string;
  release_date: string;
  seen: boolean;
}

interface Repository {
  id: string;
  name: string;
  url: string;
  description: string;
  releases: Release[];
}

interface Props {
  repositories: Repository[];
  onMarkReleaseSeen: (repositoryId: string, releaseId: string) => void;
}

export default function RepositoryList({
  repositories,
  onMarkReleaseSeen,
}: Props) {
  const filterReleases = (releases: Release[]) => {
    // Filter out unseen releases
    const unseenReleases = releases.filter((release) => !release.seen);
    if (unseenReleases.length > 0) {
      // Return only unseen releases
      return unseenReleases;
    }
    // If all releases are seen, return the latest release
    return releases.length > 0 ? [releases[releases.length - 1]] : null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repository={{
            ...repo,
            releases: filterReleases(repo.releases), // Filter releases before passing to card
          }}
          onMarkReleaseSeen={onMarkReleaseSeen}
        />
      ))}
    </div>
  );
}

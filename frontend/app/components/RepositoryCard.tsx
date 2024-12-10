'use client';
import { useState } from 'react';

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
  releases: Release[] | null;
}

interface Props {
  repository: Repository;
  onMarkReleaseSeen: (repositoryId: string, releaseId: string) => void;
}

export default function RepositoryCard({
  repository,
  onMarkReleaseSeen,
}: Props) {
  const [releases, setReleases] = useState(repository.releases);

  const handleMarkAsSeen = (releaseId: string) => {
    if (!releases) return;
    onMarkReleaseSeen(repository.id, releaseId);
    setReleases(
      releases.map((release) =>
        release.id === releaseId ? { ...release, seen: true } : release
      )
    );
  };

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold">{repository.name}</h3>
      <p>{repository.description || 'No description available'}</p>
      <ul className="mt-4">
        {releases &&
          releases.length > 0 &&
          releases.map((release) => (
            <li
              key={release && release.id}
              className={`p-2 mt-2 rounded-md text-black ${
                release && release.seen ? 'bg-green-200' : 'bg-red-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>
                  Version: {release && release.version} | Released on:{' '}
                  {new Date(
                    Number(release && release.release_date)
                  ).toLocaleDateString()}
                </span>
                {release && !release.seen && (
                  <button
                    onClick={() => handleMarkAsSeen(release.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Mark as Seen
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

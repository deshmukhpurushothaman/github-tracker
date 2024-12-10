'use client';
import { useMutation, useQuery, useSuspenseQuery } from '@apollo/client';
import { GET_REPOSITORIES } from './graphql/queries';
import { ADD_REPOSITORY, MARK_RELEASE_AS_SEEN } from './graphql/mutations';
import RepositoryList from './components/RepositoryList';
import RepositoryForm from './components/RepositoryForm';

export default function Home() {
  // Using useSuspenseQuery to fetch repositories data
  const { data, refetch } = useSuspenseQuery<any>(GET_REPOSITORIES);

  // Use mutations to handle adding a new repository and marking releases as seen
  const [addRepository] = useMutation(ADD_REPOSITORY);
  const [markReleaseSeen] = useMutation(MARK_RELEASE_AS_SEEN);

  // The handler function that adds a repository when called
  const handleAddRepository = async (url: string) => {
    try {
      const { data } = await addRepository({ variables: { url } });
      console.log('Repository added:', data);
    } catch (error) {
      console.error('Error adding repository:', error);
    }
  };

  // Mark release as seen
  const handleMarkReleaseSeen = async (
    repositoryId: string,
    releaseId: string
  ) => {
    try {
      const { data } = await markReleaseSeen({
        variables: { repositoryId, releaseId },
      });
      console.log('Release marked as seen:', data);
    } catch (error) {
      console.error('Error marking release as seen:', error);
    }
  };

  // Handle manual refresh
  const handleRefresh = async () => {
    try {
      // Trigger refetch to get the latest repository data
      await refetch();
      console.log('Repositories refreshed');
    } catch (error) {
      console.error('Error refreshing repositories:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">GitHub Repository Tracker</h1>
      <RepositoryForm
        onAddRepository={async (url: string) => {
          await handleAddRepository(url);
          refetch();
        }}
      />

      <button
        onClick={handleRefresh}
        className="bg-green-500 text-white px-4 py-2 rounded-md my-4"
      >
        Refresh Repositories
      </button>

      <RepositoryList
        repositories={data?.getRepositories || []}
        onMarkReleaseSeen={handleMarkReleaseSeen}
      />
    </div>
  );
}

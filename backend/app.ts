import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import dotenv from 'dotenv';
import { refreshRepositoriesByCron } from './utils/cron';

dotenv.config();

export const startExpressServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT) || 4000 },
  });
  refreshRepositoriesByCron.start();

  console.log(`🚀  Server ready at: ${url}`);
};

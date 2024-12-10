# Backend - GitHub Repository Tracker

This repository contains the backend code for the **GitHub Repository Tracker** application. It provides an API to manage and track repositories and their releases. The backend communicates with the GitHub API to fetch repository data, allows users to add repositories, and provides functionality to mark releases as seen.

## Technologies Used

- **Node.js** - Backend runtime environment
- **Express** - Web framework for building the API
- **Apollo Server** - GraphQL server for managing API requests
- **Octokit** - GitHub API client for interacting with the GitHub repositories
- **PostgreSQL** - For storing repository and release data

## Folder Structure

```
backend/
├── node_modules/         # Dependencies
├── src/                  # Source code
│   ├── resolvers/        # GraphQL resolvers for queries and mutations
│   ├── database/         # Database connection and schemas
|   ├── utils/            # Cron job for data sync
│   ├── index.ts          # Entry point to the backend application
│   ├── app.ts            # Configures Apollo Server and Express
├── .env                  # Environment variables
├── package.json          # NPM package configuration
├── README.md             # Backend readme file
```

## Setup Instructions

### Prerequisites

Make sure you have the following tools installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**
- **PostgreSQL** - Database to store the repositories and releases

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/deshmukhpurushothaman/github-tracker.git
```

### 2. Install dependencies

Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the backend directory and add the following variables:

```
GITHUB_TOKEN=your_github_token
DATABASE_URL=your_postgres_connection_string
PORT=4000
```

- **GITHUB_TOKEN**: Generate a personal access token on GitHub to authenticate API requests.
- **DATABASE_URL**: PostgreSQL connection URI, typically in the format `postgres://username:password@host:port/database`.
- **PORT**: Port on which the backend will run (default `PORT=4000`).

### 4. Set up PostgreSQL Database

Make sure that your PostgreSQL instance is running and the database is properly set up. You can use a tool like [pgAdmin](https://www.pgadmin.org/) to manage the database or directly use PostgreSQL CLI.

You can create the necessary tables by running the database migrations or seeding scripts if available in the project.

#### Pushing the schema to the database

In order to set up the necessary tables in the PostgreSQL database, you need to run the schema file `database/schema.sql` that is located inside the `backend/database` folder.

Run the following commands to apply the schema:

```bash
psql -h your_host -U your_username -d your_database -f backend/src/database/schema.sql
```

- Replace `your_host`, `your_username`, and `your_database` with your PostgreSQL database details.

This will create the necessary tables for tracking repositories and releases.

### 5. Run the backend

After setting up the environment variables, run the backend server:

```bash
npm run dev
```

This will start the server on the port defined in the `.env` file (default is `PORT=4000`). The GraphQL API will be available at `http://localhost:4000/graphql`.

### 6. Test the API

Once the backend server is up and running, you can use GraphQL playground or any other GraphQL client to test the available queries and mutations.

### Available API Queries

- **getRepositories**: Fetches all tracked repositories along with their releases.
- **addRepository**: Adds a new repository by URL (fetches data from GitHub API).
- **markReleaseAsSeen**: Marks a specific release of a repository as "seen".
- **refreshRepository**: Fetches releases for all repositories.

### Example Queries:

#### Fetch all repositories

```graphql
query {
  getRepositories {
    id
    name
    url
    releases {
      id
      version
      release_date
      seen
    }
  }
}
```

#### Add a new repository

```graphql
mutation {
  addRepository(url: "https://github.com/username/repository-name") {
    id
    name
    url
  }
}
```

#### Mark a release as seen

```graphql
mutation {
  markReleaseAsSeen(repositoryId: "repo-id", releaseId: "release-id") {
    id
    version
    seen
  }
}
```

#### Rrfresh all repositories

```graphql
mutaion {
    refreshRepository(repositoryId: $repositoryId) {
    description
    id
    name
    url
    releases {
      id
      release_date
      seen
      version
    }
  }
}
```

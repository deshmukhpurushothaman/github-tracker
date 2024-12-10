# Frontend - GitHub Repository Tracker

This is the frontend part of the GitHub Repository Tracker project, built with **Next.js** and **Apollo Client** to provide a user-friendly interface for interacting with the backend and managing GitHub repositories and their releases.

## Features

- View a list of GitHub repositories and their releases.
- Add new repositories via GitHub URLs.
- Mark releases as "seen".
- Refresh the repository list to fetch the latest data.
- UI components built with **Tailwind CSS**.

## Technologies Used

- **Next.js**: A React framework for building server-rendered React applications.
- **Apollo Client**: A GraphQL client to interact with the backend API.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TypeScript**: For type safety and better development experience.

## Setup

### Prerequisites

Before starting, ensure that the following are installed on your local machine:

- **Node.js** (v16.0 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **Yarn** (alternative package manager) - [Install Yarn](https://yarnpkg.com/)

### Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/deshmukhpurushothaman/github-tracker.git
   cd github-tracker/frontend
   ```

2. Install dependencies:

   If you're using **npm**:

   ```bash
   npm install
   ```

   If you're using **Yarn**:

   ```bash
   yarn install
   ```

3. Set up the environment variables:

   Create a `.env.local` file in the root of the `frontend` folder and add the following configuration:

   ```env
   GRAPHQL_URL=http://localhost:4000/graphql
   ```

   Update `GRAPHQL_URL` to match your backend API URL.

4. Run the development server:

   ```bash
   npm run dev
   ```

   Or, if using **Yarn**:

   ```bash
   yarn dev
   ```

   Your app should now be accessible at `http://localhost:3000`.

## Project Structure

- `pages/`: Contains the main pages of the application.
  - `index.tsx`: The homepage where repositories are displayed and can be added.
- `components/`: Reusable components used across the app.

  - `RepositoryList.tsx`: Displays the list of repositories.
  - `RepositoryCard.tsx`: Displays information about a single repository.
  - `RepositoryForm.tsx`: A form for adding new repositories.

- `graphql/`: Contains GraphQL queries and mutations.

  - `queries.ts`: Contains GraphQL queries to fetch data from the backend.
  - `mutations.ts`: Contains GraphQL mutations to modify data.

- `styles/`: Contains global styles, including Tailwind CSS configurations.

## Available Scripts

- `npm run dev` or `yarn dev`: Starts the development server.
- `npm run build` or `yarn build`: Builds the project for production.
- `npm run start` or `yarn start`: Starts the production build server.

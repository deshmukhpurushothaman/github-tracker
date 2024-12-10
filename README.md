# GitHub Repository Tracker

## Project Overview

This project allows you to track releases of your GitHub repositories in real-time. It consists of a frontend application and a backend server. The frontend is built using Next.js and communicates with the backend to fetch, display, and manage repository data. The backend handles interactions with the GitHub API to retrieve repository releases, store them, and update their status.

### Features:

- Track GitHub repository releases.
- Mark releases as seen.
- Display unseen releases or the latest release if all releases are seen.
- Add new repositories to track.

## Project Structure

This project is organized into two main directories:

- `frontend`: Contains the Next.js application that serves the user interface.
- `backend`: Contains the Node.js server that interacts with the GitHub API and manages the data.

## Prerequisites

Before you begin, ensure that you have the following installed:

- Node.js (>= 16.x)
- npm or yarn (for managing dependencies)

Additionally, you'll need a GitHub personal access token for the backend to interact with the GitHub API.

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/deshmukhpurushothaman/github-tracker.git
cd github-tracker
```

### 2. Backend Setup

#### 2.1. Install Backend Dependencies

Navigate to the `backend` directory and install the necessary dependencies:

```bash
cd backend
npm install
```

#### 2.2. Configure GitHub Personal Access Token

Create a `.env` file in the `backend` folder and add your GitHub personal access token like so:

```bash
GITHUB_TOKEN=your_github_personal_access_token
DATABASE_URL=
PORT=4000
```

#### 2.3. Start the Backend Server

To start the backend server:

```bash
npm run dev
```

This will start the server and allow it to handle requests from the frontend.

### 3. Frontend Setup

#### 3.1. Install Frontend Dependencies

Navigate to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

#### 3.2. Configure API URL

Make sure that the frontend is pointing to the correct backend URL by updating the `graphql` API URL in the frontend code if necessary.

#### 3.3. Start the Frontend Application

To start the frontend application:

```bash
npm run dev
```

This will run the Next.js application on `http://localhost:3000` by default.

### 4. Test the Application

- Once both the frontend and backend servers are running, you can open your browser and go to `http://localhost:3000` to interact with the GitHub Repository Tracker application.
- Add repositories, track releases, and mark them as seen.

## Future Improvements

### 1. User Authentication

Implement user authentication to allow users to securely log in and manage their repository tracking preferences. This can include:

- **OAuth authentication** via GitHub to simplify login and securely access user data.
- Support for **email/password** login for general users.

### 2. GitHub Account Connection

Allow users to directly connect their GitHub account to the application. This feature could:

- Automatically fetch and display all repositories owned or contributed by the user.
- Enable users to track their repositories without needing to manually enter URLs.

### 3. Multi-Factor Authentication (MFA)

Enhance security by adding support for **Multi-Factor Authentication (MFA)**. This will provide an additional layer of protection during the login process and is particularly important for accounts accessing sensitive data.

### 4. Docker Containerization

Containerize both the frontend and backend using **Docker** to simplify deployment and environment management. This would:

- Ensure that the application runs consistently across different environments (e.g., development, staging, production).
- Make it easier to deploy to various platforms like AWS, Azure, or DigitalOcean.

### 5. Docker Compose

Use **Docker Compose** to manage multi-container applications. This will:

- Allow both the frontend and backend to be spun up with a single command.
- Provide a unified environment for development and production, with clear service configurations.

### 6. Framer Motion for Animations

Implement **Framer Motion** for smooth animations and transitions in the frontend. This would enhance the user experience by adding visually appealing effects, such as:

- Animated transitions when switching between repositories.
- Smooth fade-ins and slide-ups for repository cards and releases.

### 7. Separate Detailed Page for Repository

Create a detailed view page for each repository to display more information such as:

- A complete history of releases.
- Contributors and commit history.
- License and other metadata.
- The ability to view release notes and documentation.
  This will allow users to get more detailed insights into their repositories directly from the application.

## Troubleshooting

### Backend Errors:

- If the backend is unable to connect to GitHub, ensure that your personal access token is correctly set in the `.env` file and that your GitHub account has the necessary permissions to access the repositories you're tracking.

### Frontend Errors:

- If the frontend is unable to connect to the backend, check that the backend is running and ensure the correct API URL is configured in the frontend.

# Football Stats

Web application that allows users to view football match statistics. The frontend is built with React and the backend with Node.js and Express, with a MySQL database to store the data.

## Features

  * **Season Selection:** Users can select a football season (from 2010 to 2023) to view the corresponding matches.
  * **Match Viewing:** For each season, the application displays a list of matches, including home and away teams, date, stadium, score, and referee.
  * **Match Details:** Users can expand each game to view additional details, such as match events (e.g., goals, cards) and the player lineup for each team.

## Project Structure

The project is divided into two main parts:

  * **`frontend`**: Contains the React application.
  * **`backend`**: Contains the Node.js and Express server and the database configuration.

## Technologies Used

### Frontend

  * **React:** JavaScript library for building user interfaces.
  * **Axios:** Promise-based HTTP client for making requests to the backend.
  * **React-Select:** Select input component for React.

### Backend

  * **Node.js:** Server-side JavaScript runtime environment.
  * **Express:** Web framework for Node.js, used to build the API.
  * **MySQL2:** MySQL client for Node.js, for database interaction.
  * **Cors:** Middleware to enable Cross-Origin Resource Sharing.
  * **Dotenv:** Module to load environment variables from a `.env` file.

## How to Run the Project

### Prerequisites

  * Node.js and npm installed.
  * A running MySQL database server.

### Backend

1.  **Navigate to the `backend` folder**:
    ```bash
    cd backend
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Configure environment variables**: Create a `.env` file in the `backend` folder and add the following variables:
    ```
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    ```
4.  **Start the server**:
    ```bash
    node index.js
    ```
    The server will be running at `http://localhost:5000`.

### Frontend

1.  **Navigate to the project root folder**.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the React application**:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

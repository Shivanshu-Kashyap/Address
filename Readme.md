# My Project

This project is a web application built using **React** and **Tailwind CSS** for the frontend, with a backend built using **Node.js** and **MongoDB**. The application allows users to save, mark as favorite, and delete addresses. It also features geolocation tracking to retrieve the user's current location.

## Features

- **Responsive Frontend**: The frontend is fully responsive, built with **React** and styled using **Tailwind CSS**.
- **Geolocation Tracking**: The application tracks and displays the user's current location.
- **Address Management**: Users can:
  - Add addresses via a form.
  - View a list of saved addresses.
  - Mark addresses as favorites.
  - Delete addresses.
- **Backend Integration**: Address data is stored and fetched from the backend using **Axios** to interact with the REST API.
- **Favorites**: Users can mark addresses as "favorite" and toggle their state.

## Tech Stack

- **Frontend**:
  - **React**: A JavaScript library for building user interfaces.
  - **Tailwind CSS**: A utility-first CSS framework for styling.
  - **Zustand**: A state management library for React.
  - **Axios**: For making HTTP requests to the backend.
  - **@react-google-maps/api**: To integrate Google Maps API for geolocation.

- **Backend**:
  - **Node.js**: JavaScript runtime for server-side development.
  - **Express.js**: Web framework for Node.js.
  - **MongoDB**: NoSQL database to store address data.
  - **Mongoose**: ODM (Object Document Mapper) for MongoDB.

## Setup

### 1. Backend Setup

To set up the backend, follow these steps:

1. **Clone the Repository**:
   Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/my-project.git

2. **Install Dependencies**:
    Navigate to the server directory and install the required   
     dependencies:
    ```
    cd server
    npm install
3. **Environment Variables**:
    Create a .env file in the server directory with the following 
     content:
     ```
     MONGO_URI=mongodb://localhost:27017/my_project
        PORT=5000
    ```
    Replace MONGO_URI with your MongoDB connection string if you 
      are using a remote MongoDB instance.
4. **Run the Backend**:
    ```
    npm run dev
### 2. Frontend Setup
To set up the frontend, follow these steps:

1. ***Navigate to the Frontend Directory***: Go to the my-project directory:
    ```
    cd my-project
    ```
2. ***Install Dependencies***: Install the required dependencies:

    ```
    npm install
    ````

3. ***Run the Frontend***: Start the development server:
    ```
    npm run dev

The frontend will be running on http://localhost:5173.

### 3. Connect Frontend and Backend
Ensure that the frontend can communicate with the backend by setting the correct API URL for address management. The frontend will be calling the backend API at http://localhost:5000/api/addresses.
# To-do List Full Stack App

A full-stack to-do application built with React on the frontend and Express + MongoDB on the backend. The app lets users create, edit, complete, and delete tasks, and stores them persistently in a database.

## Overview

This project demonstrates a simple full-stack architecture where:

- The frontend provides a clean task management interface.
- The backend exposes REST API endpoints for task operations.
- MongoDB stores the list data and persists it across requests.

## Tech Stack

- Frontend: React, Vite, Axios
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Styling: CSS

## Project Structure

```text
To-do List FullStack app/
├── README.md
├── To-do list app/
│   ├── README.md
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── main.jsx
│       └── PAges/
│           ├── Home.jsx
│           ├── Create.jsx
│           └── ...
│
│   └── Backend/
│       ├── package.json
│       ├── server.js
│       └── Models/
│           └── todo.js
```

## Features

- Add new tasks
- View all tasks
- Edit task text
- Mark tasks as complete or incomplete
- Delete tasks
- Persistent storage with MongoDB
- Responsive user interface

## Frontend

The frontend is a React + Vite app located in `To-do list app/`.

### Frontend responsibilities

- Render the task list
- Submit task creation requests
- Update task status and text
- Remove tasks from the list
- Show loading and error states

### Main frontend files

- `src/App.jsx`: App entry point
- `src/PAges/Home.jsx`: List logic, API integration, and UI rendering
- `src/App.css`: Styling for the UI

## Backend

The backend is an Express server located in `To-do list app/Backend/`.

### Backend responsibilities

- Receive HTTP requests from the frontend
- Validate incoming task payloads
- Connect to MongoDB using Mongoose
- Perform CRUD operations on the `todos` collection

### API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/todos` | Fetch all tasks |
| POST | `/add` | Create a new task |
| PATCH | `/todos/:id` | Update a task by ID |
| DELETE | `/todos/:id` | Delete a task by ID |

### Backend model

The `Todo` schema includes:

- `task`: required string
- `completed`: boolean with default `false`
- timestamps for created and updated values

## Database

The project uses MongoDB with the default connection string:

```bash
mongodb://127.0.0.1:27017/config
```

You can override it with:

```bash
MONGODB_URI=your_mongodb_connection_string
```

## Setup and Installation

### 1. Install frontend dependencies

```bash
cd "To-do list app"
npm install
```

### 2. Install backend dependencies

```bash
cd "To-do list app/Backend"
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running locally or provide a valid `MONGODB_URI`.

### 4. Run the backend

```bash
cd "To-do list app/Backend"
npm start
```

### 5. Run the frontend

```bash
cd "To-do list app"
npm run dev
```

The frontend typically runs on the Vite default port, while the backend listens on port `8000`.

## Development Notes

- The frontend communicates with the backend using Axios.
- The backend uses `cors` to allow local cross-origin requests during development.
- The server validates task content before saving it to MongoDB.
- The app uses a simple REST pattern instead of a framework like React Query or Redux.

## Future Improvements

- Add user authentication
- Add due dates and priorities
- Add search/filtering for tasks
- Add Docker support for easier local setup
- Add unit and integration tests

## License

This project is currently maintained as a learning/demo application and does not include a custom production license file.

## Summary

This project is a practical example of a full-stack application using React, Express, and MongoDB. It shows how a frontend can interact with a backend API to create a clean and functional task management system.

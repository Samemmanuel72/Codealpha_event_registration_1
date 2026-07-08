# Event Registration System

A backend-powered Event Registration System built using **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

## Features

- View all available events
- View individual event details
- Register users for events
- View registrations by email
- Cancel event registrations
- MongoDB database integration
- Automatic database seeding with sample events

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML
- CSS
- JavaScript

## Installation

### Clone the repository

```bash
git clone https://github.com/Samemmanuel72/Codealpha_event_registration_1.git
```

### Install dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is installed and the MongoDB service is running.

### Run the project

```bash
npm start
```

Open your browser and visit:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events/:id` | Get event details |
| POST | `/api/registrations` | Register for an event |
| GET | `/api/registrations/:email` | View registrations |
| DELETE | `/api/registrations/:id` | Cancel registration |

## Project Structure

```
event-registration-system/
│
├── models/
├── public/
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Author

**Sam Emmanuel**
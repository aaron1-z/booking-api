#  Basic Activity Booking API

This is a simple REST API backend for a "Basic Activity Booking App". 

## Objective

To create a REST API backend that allows users to register, login, view available activities, book activities, and view their bookings.

## Tech Stack

*   **Backend:** Node.js with Express.js
*   **Database:** MongoDB (using Mongoose ODM)
*   **Authentication:** JWT (JSON Web Tokens) for token-based authentication
*   **Password Hashing:** bcryptjs
*   **Validation:** Joi for request data validation

## Features

*   User registration and login with JWT authentication.
*   Password hashing for security.
*   Public endpoint to list all available activities.
*   Authorized endpoints for users to book activities.
*   Authorized endpoint for users to view their own booked activities.
*   Request data validation using Joi.
*   Clean code structure with separation of concerns (routes, controllers, models, middleware, validators).


## Prerequisites

*   Node.js (v16.x or higher recommended)
*   npm (usually comes with Node.js)
*   MongoDB (a local instance or a free MongoDB Atlas cluster)
*   Git

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aaron1-z/booking-api
    cd booking-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory of the project.
    Add the following environment variables, replacing the placeholder values with your actual credentials/keys:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/meetx_activity_db # Or your MongoDB Atlas connection string
    JWT_SECRET=yourSuperStrongAndSecretKeyForJWT!@#$123 # Choose a strong, unique secret key
    ```
    *   **`PORT`**: The port on which the server will run (defaults to 5000 if not set).
    *   **`MONGO_URI`**: Your MongoDB connection string.
        *   For local MongoDB: `mongodb://localhost:27017/your_database_name`
        *   For MongoDB Atlas: `mongodb+srv://<username>:<password>@<cluster-url>/<database_name>?retryWrites=true&w=majority` (Remember to URL-encode special characters in your password if any).
    *   **`JWT_SECRET`**: A secret key used to sign and verify JWTs. Make this a long, random, and strong string.

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the server using `nodemon`, which automatically restarts the server on file changes. The API will typically be available at `http://localhost:5000`.

    Alternatively, for a standard start:
    ```bash
    npm start
    ```

## API Endpoints

The base URL for all API endpoints is `http://localhost:5000/api` (or your configured host and port).

### 1. User Authentication

*   **Register User**
    *   **Endpoint:** `POST /users/register`
    *   **Description:** Registers a new user.
    *   **Request Body:**
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "password": "password123"
        }
        ```
    *   **Successful Response (201 Created):**
        ```json
        {
            "_id": "userId",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "token": "jwt.auth.token"
        }
        ```

*   **Login User**
    *   **Endpoint:** `POST /users/login`
    *   **Description:** Logs in an existing user.
    *   **Request Body:**
        ```json
        {
            "email": "john.doe@example.com",
            "password": "password123"
        }
        ```
    *   **Successful Response (200 OK):**
        ```json
        {
            "_id": "userId",
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "1234567890",
            "token": "jwt.auth.token"
        }
        ```

### 2. Activities

*   **List Activities (Public Endpoint)**
    *   **Endpoint:** `GET /activities`
    *   **Description:** Retrieves a list of all available activities.
    *   **Successful Response (200 OK):**
        ```json
        [
            {
                "_id": "activityId1",
                "title": "Cricket Match",
                "description": "Friendly T20 game.",
                "location": "Central Park",
                "date": "2024-08-15T00:00:00.000Z",
                "time": "10:00 AM"
            },
            // ... more activities
        ]
        ```

*   **Create Activity (Helper/Admin - Currently Public for Seeding)**
    *   **Endpoint:** `POST /activities`
    *   **Description:** Creates a new activity. (Note: This endpoint is currently public for ease of testing/seeding. In a production app, it would likely be restricted to admin users.)
    *   **Request Body:**
        ```json
        {
            "title": "Movie Night",
            "description": "Screening of a new blockbuster.",
            "location": "Cityplex Cinema",
            "date": "2024-08-16",
            "time": "07:30 PM"
        }
        ```
    *   **Successful Response (201 Created):** The created activity object.

### 3. Bookings (Authorized Users Only)

*Requires `Authorization: Bearer <JWT_TOKEN>` header for all endpoints in this section.*

*   **Book an Activity**
    *   **Endpoint:** `POST /bookings`
    *   **Description:** Allows a logged-in user to book an available activity.
    *   **Request Body:**
        ```json
        {
            "activityId": "activityIdToBook"
        }
        ```
    *   **Successful Response (201 Created):**
        ```json
        {
            "_id": "bookingId",
            "user": "loggedInUserId",
            "activity": "activityIdBooked",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
        ```

*   **Get My Bookings**
    *   **Endpoint:** `GET /bookings/my`
    *   **Description:** Retrieves a list of all activities booked by the currently logged-in user.
    *   **Successful Response (200 OK):** An array of activity objects.
        ```json
        [
            {
                "_id": "bookedActivityId1",
                "title": "Cricket Match",
                "description": "Friendly T20 game.",
                "location": "Central Park",
                "date": "2024-08-15T00:00:00.000Z",
                "time": "10:00 AM"
            },
            // ... other booked activities
        ]
        ```

## API Testing

A Postman collection is provided (or can be easily created) to test all API endpoints.
*   Import the collection into Postman.
*   Ensure the server is running.
*   For authorized routes, obtain a JWT token from the Login or Register endpoint and set it as a Bearer Token in the Authorization header of your requests.

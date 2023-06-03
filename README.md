# Birthday Reminder Application

This is a simple application that sends a happy birthday message to users on their birthday at exactly 9 am in their local time. It provides an API to create and delete users and utilizes an external email service to send birthday messages.

## Requirements

To run the application, you need the following:

- Node.js runtime environment
- MongoDB database

## API Endpoints

The application exposes the following API endpoints:

- `POST /user`: Creates a new user with the specified details.
- `GET /users`: Retrieves all users.
- `GET /user/:id`: Retrieves a user with the specified ID.
- `PUT /user/:id`: Updates a user with the specified ID.
- `DELETE /user/:id`: Deletes a user with the specified ID.

## User Details

A user has the following fields:

- First name
- Last name
- Email
- Birthday date (format: YYYY-MM-DD)
- Location (timezone specified using the moment.js format)

## Running the Project

To run the project, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/pradnyanandana/birthday-api.git
   ```

2. Install the dependencies:

   ```shell
   cd birthday-api
   npm install
   ```

3. Create an `.env` file based on the provided `env.example` file:

   ```shell
   cp env.example .env
   ```

   Set the values for the following environment variables in the `.env` file:

   - `DATABASE_URI`: MongoDB connection URI
   - `DATABASE_URL`: MongoDB connection URL
   - `DATABASE_NAME`: Name of the MongoDB database

4. Start the application:

   ```shell
   npm start
   ```

   Make sure you have a running instance of MongoDB and provide the appropriate connection details in the `.env` file before starting the application.

The API documentation with Postman can be accessed [here](https://www.postman.com/galactic-firefly-138065/workspace/birthday-reminder/collection/2534395-a92ced8a-d5f1-4ef8-9ac1-21f1ec6fdd54?action=share&creator=2534395).
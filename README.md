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

## Abstraction

This application follows a specific folder structure and abstraction pattern to improve code organization and maintainability. The application architecture includes the following folders:

1. Routes

   The `routes` folder contains the API route handlers. These files define the endpoints and the corresponding HTTP methods for handling incoming requests.

2. Controllers

   The `controllers` folder houses the controller files. Controllers are responsible for extracting data from incoming requests.

3. Service

   The `service` folder contains the service layer of the application. Services encapsulate the business logic and provide an abstraction for interacting with the data layer. They receive data from the controllers, perform operations, and communicate with the repository to retrieve or store data.

4. Repository

   The `repository` folder handles data retrieval and storage operations. It interacts with the MongoDB database using specific models and schemas defined in the `database` folder. The repository layer is responsible for querying the database and returning data to the service layer or storing new data as needed.

Other Folders:

Apart from the core architectural folders, there are several additional folders in the application:

1. database

   The `database` folder contains the MongoDB schema definitions. It includes files that define the structure and properties of the collections used in the application.

2. middleware

   The `middleware` folder holds the middleware functions used in the application. These functions handle tasks such as data validation from incoming requests and error handling.

3. core

   The `core` folder contains configuration files and utility functions necessary for the core functioning of the application. It may include files related to environment variables, logging configuration, and other essential setup requirements.

4. logs

   The `logs` folder is where the application's logs are saved. It provides a centralized location for storing and accessing logs generated during the application's runtime.

5. tests

   The `tests` folder is utilized for testing the application. It contains test files and related utilities for automated testing. These tests help ensure the correctness and reliability of the application's functionality.

For more details about the implementation, please refer to the individual files within each folder.

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

   - `DATABASE_URL`: MongoDB connection URL
   - `DATABASE_NAME`: Name of the MongoDB database

4. Start the application:

   ```shell
   npm start
   ```

   Make sure you have a running instance of MongoDB and provide the appropriate connection details in the `.env` file before starting the application.

The API documentation with Postman can be accessed [here](https://www.postman.com/galactic-firefly-138065/workspace/birthday-reminder/collection/2534395-a92ced8a-d5f1-4ef8-9ac1-21f1ec6fdd54?action=share&creator=2534395).
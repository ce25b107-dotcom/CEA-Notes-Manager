# CEA Notes Manager

A simple full-stack Notes Manager built as part of the CEA WebOps application.

## Features

* User signup and login
* Password hashing using bcrypt
* JWT-based authentication
* Create, read, update and delete notes
* User-specific notes
* Basic input validation and error handling

## Technologies Used

* HTML, CSS and JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* bcrypt
* JSON Web Token (JWT)

## How to Run

1. Install Node.js.
2. Clone or download the repository.
3. Open the project folder in the terminal.
4. Install dependencies:

```bash
npm install
```

5. Create a `.env` file and add the MongoDB connection string:

```text
MONGO_URI=your_mongodb_connection_string
```

6. Start the server:

```bash
node server.js
```

7. Open:

```text
http://localhost:3000
```

## Project Structure

```text
models/      Database models
routes/      Authentication and notes APIs
public/      Frontend pages
server.js    Main server file
```

## Note

The `.env` file and `node_modules` folder are excluded from the repository for security and size reasons.

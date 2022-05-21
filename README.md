# HireMeX

Website created in less than 48h for an interview project.

# How to run

The project was created using node v17.4.0, please ensure your version of node is recent enough. Start by cloning the repository. Start the api server before the client server.

## Database

Ensure you are using a recent enough version of `sqlite3` before proceeding :

- `cd database`
- `touch database.db`
- `sqlite3 database.db < initdb.sql`

## Server

The server runs using `node.js`.

- `cd server`
- `npm install`
- `node index.js`
  Server is now running on port 3000

## Client

The client app was created using `create-react-app`

- `cd client`
- `npm install`
- `npm start` to run in development mode (app will run on port 8080 on mac, on 3001 on PC)

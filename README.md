# The DiscoveryPath
This project helps users understand the ongoing projects in the team and provide project specific and team specific learning resources

## Setup

## Frontend

1. Navigate to client folder in the terminal using command: 

        cd client

2. Install dependencies using command: 

        npm install

## Backend

1. At root directory (DiscoveryPath) run command: 
    
        npm install

## Database

1. Ensure the Mongodb server is running locally at: 

        mongodb://localhost:27017/discoverypath

2. Add data to database using scripts folder by running command (at root directory): 

        npm run init-db 

## Usage
Once the setup is complete, the project is ready to run! 

To run the frontend use the following commands:

    1. cd client
    2. npm start

To run the backend use the following command (at root folder) :

    1. npm run dev

## Initial steps:
To test the web application you can sign in using the following user details:

    email: alice.smith@example.com

    password: password123

This user is a Resource Manager so has access to all features this solution provides

(See scripts/employeeData.js to find other user login details)

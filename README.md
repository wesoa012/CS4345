# Fall 2022 CS 4345 - TA System
## Wes Anderson, Michael Doherty, Jack Fox, Peyton Maass


## The Problem
For this project we were tasked with designing and building a Teaching Assistant application for the SMU CS Department. The system should allow professors to post position listings which students are then able to apply for. Professors are then able to view the applications and either accept them or deny them.


## Building and Running the Application Locally

### Step 1: Configure Backend

If you would like to run a local version of the database you will need to install and run mysql locally. We currently have a cloud RDS setup, but do not have the .env file on github. If you would like to run the cloud version of the database please send me an email request at **wesa@smu.edu**

- Go to https://www.mysql.com/downloads/ and download mysql. This is used for the backend database.
- Run mysql_setup.sql
- Start a mysql shell in the command prompt. Then copy and paste from the my_sql.sql in the backend folder to create the database and tables associated with it
- You will also need to make a file named .env in /backend. 
    ```javascript
    # mysql database name
    MYSQL_DB=cs4345

    # mysql port (usually 3306)
    MYSQL_PORT=3306

    # LOCAL
    MYSQL_LOCAL_USER=add_localhost_sql_user_here
    MYSQL_LOCAL_PASS=add_localhost_sql_password_here
    MYSQL_LOCAL_HOST=localhost
    ```
    
- After making this file you will need to go into /backend/database/knex.js and change ***knex(knexConfig.cloud)*** to ***knex(knexConfig.local)***


### Step 2: NPM installs

In two command prompts navigate to the working directory that is created by opening the downloaded zip file from gitgub.

In one command prompt window navigate into the frontend folder. ***cd frontend***
In the other navigate into the backend folder. ***cd backend***
In both windows install the necessary packages using ***npm install***

### Step 3: NPM start

Run ***npm start*** in both command prompts to start both the frontend and backend. By starting the frontend your default internet browser will automatically open a tab and go to http://localhost:3000. If this step does not happen please go to http://localhost:3000 yourself.

### Step 4: Use software

You will now be able to use our TA system. 
 - Please note that every new account will have an account type of "1". In order to change this you will need to sign in as an admin and manually change account type. 

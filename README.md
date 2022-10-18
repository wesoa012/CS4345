# Fall 2022 CS 4345 - TA System
## Wes Anderson, Michael Doherty, Jack Fox, Peyton Maass


## The Problem
For this project we were tasked with designing and building a Teaching Assistant application for the SMU CS Department. The system should allow professors to post position listings which students are then able to apply for. Professors are then able to view the applications and either accept them or deny them.


## Building and Running the Application Locally

Note - We plan to migrate to an AWS server. While designing we are using everything locally

Step 1: Install MySql

Go to https://www.mysql.com/downloads/ and download mysql. This is used for the backend database.

Step 2: Run mysql_setup.sql

Start a mysql shell in the command prompt. Then copy and paste from the my_sql.sql in the backend folder to create the database and tables associated with it

Step 3: NPM installs

In two command prompts navigate to the working directory that is created by opening the downloaded zip file from gitgub.

In one command prompt window navigate into the frontend folder. ***cd frontend***
In the other navigate into the backend folder. ***cd backend***
In both windows install the necessary packages using ***npm install***

Step 4: NPM start

Run ***npm start*** in both command prompts to start both the frontend and backend. By starting the frontend your default internet browser will automatically open a tab and go to http://localhost:3000. If this step does not happen please go to http://localhost:3000 yourself.

Step 5: Use software

You will now be able to use our TA system. Please note that every new account will have an account type of "1". We have assumed that only student will be able to sign up. You need to manually update a user's role if you would like them to be seen by the system as a professor. Through sprint 1 there is no difference between professors and students since we only have login and signup implemented.

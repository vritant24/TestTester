# TestTester

## CS 408 project Team 19
### Members - Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj

A tool for test driven coninuous deployment

Instructions for setting up - 

* Create a branch in git, make sure you are not making changes on master.

* Make sure node and npm are installed.

* In the root directory of this project, run `npm install` to install all the dependencies of the server.

* run `npm start` to start the server.
    - if you see an error, and you have not set up the database on your computer yet, comment out `var db = require('./db)` in Middleman/index.js. run `npm start` again.

* In a separate terminal, open the client folder and run `npm install` to install all the dependencies of the client.

* run `npm start`. It should open a page in your browser at `localhost:3000/` which will redirect you to github's login permissions. on completing the login process, you will be directed to a blank page, and in the terminal of the Middleman server, you will see console logs of the access code and the session id.
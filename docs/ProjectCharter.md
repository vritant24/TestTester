# Project Charter
## SquareCI
### Team 19 : Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj
---

## Problem Statement:
* Deploying software can be a cumbersome task that often occurs without complete testing of new features being pushed into production. To combat this, continuous deployment(CD) provides an automatic way to push new code out to production while still validating that your changes integrate and don’t break existing features. 

* Most CD solutions are either proprietary or costly. We will develop a simplified version of continuous deployment that can be utilized easily and cheaply by anyone. 

* Our workflow for this is as follows: A user utilizes our client side application to enter the details of their GitHub repository to be monitored and their server credentials for automatic application deployment. This information is securely transferred to our server where we begin to monitor the github repository on a timed loop. When we detect new changes being pushed into the user specified branch, we pull the branch and compile the application source on our central server. Next, we begin to attempt to deploy their changes to alpha, beta, and prod. Each stage runs the user specified tests, and if the tests pass then the application is deployed to the correlative stage. 

* For example, in alpha deployment, all unit tests must pass. For beta deployment, all subsystem tests must pass and alpha deployment must succeed. Finally, for prod, full integration tests must pass and the 2 prior stages must succeed. 

* If any of these tests fail, deployment halts and logs are generated detailing the test failures. These logs are then used to propagate data into the front end web interface for monitoring your application’s deployment. The front end will give you details about which stages are already deployed, what’s currently being tested, and what tests failed.


## Project Objectives:
* Develop a system that allows users to auto run a suite tests on their codebase and push it to specified endpoints (for example Alpha, Beta and Production) from GitHub.


* Create a central server to connect the GitHub API, user, and three endpoints that act as benchmarks for the user created tests. 


* Connect our central server to GitHub API in order to pull code from the master branch of the repository and run through its test suite whenever a new pull request is created.


* Create a web interface that allows the user to add a repository and deployment servers as well as monitor the testing on the code being pushed to said servers.


* Create an easy way to connect pre existing servers to our CD software in order to allow for smooth deployments of the clients code.

## Stakeholders:
* Project managers : Jonah Heeren, Vritant Bhardwaj


* Project developers : Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj


* Project consultant : Eehita Parameswaran


* Product user group : Software Developers or Software Testers that work on continuously deployed code.

## Deliverables:
* An intermediate server that interacts with GitHub API, runs user’s tests and generates test logs and pushes code to specified development endpoints.


* A RESTful API that sends the test logs from the intermediate server to the web client.


* A web interface written with React.js to let user monitor the continuous deployment being done on the intermediate server.


##Project Charter
Project Name
Team 19 : Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj


##Problem Statement:
Deploying software can be a cumbersome task that often occurs without complete testing of new features being pushed into production. To combat this, continuous deployment(CD) provides an automatic way to push new code out to production while still validating that your changes integrate and don’t break existing features. 
Most CD solutions are either proprietary or costly. We will develop a simplified version of continuous deployment that can be utilized easily and cheaply by anyone.

##Project Objectives:
Our main point of focus will be the central server to connect the GitHub API, user, and multiple servers to serve as benchmarks for the user created tests. 
Create elaborate tests that cover multiple levels to ensure the finalized program will not contain any bugs. 
Connect our central server to GitHub API in order to pull code from the master branch of the repository in order to run through its unit tests. We also need to create a trigger to pull from GitHub, whenever there are changes being pushed to the master branch. 
Create an easy way to connect pre existing servers to our CD software in order to allow for smooth deployments of the clients code.

##Stakeholders:
Project managers : Jonah Heeren, Vritant Bhardwaj
Project developers : Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj
Project consultant : Eehita Parameswaran
Product user group : Software Developers or Software Testers that work on continuously deployed code.

##Deliverables:
An intermediate server that interacts with GitHub API, runs the tests and generates test logs, from which the web clients can read or display the testing information. 
Three servers to represent three preset user-defined test phases to give the users the clear picture of the where the current testing progress lies in. 
A web interface to display test logs, for the users to analyse.

The servers will be coded with Java, and the web interface with a Javascript framework (React). 

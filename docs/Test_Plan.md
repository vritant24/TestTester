Test Plan - Team 19
SquareCI

Members: Brandon Marx, Jonah Heeren, Jun Soo Kim, Shulin Ye, Vritant Bhardwaj


TestID: UserEndpoint1
Test Title: Reachable Web Server
Test Severity: Severity 1
Instructions: Initiate a GET request to the web UI endpoint.
Expected Result: The page is served by the web server. HTTP status 200.

TestID: UserEndpoint2
Test Title: Successful account creation
Test Severity: Severity 1
Instructions: Initiate a good POST request to the appropriate endpoint with account details.
Expected Result: Record is created. HTTP status 201.

TestID: UserEndpoint3
Test Title: Successful account deletion
Test Severity: Severity 2
Instructions: Initiate a good DELETE request to the appropriate endpoint with account details.
Expected Result: Record is deleted. HTTP status 200.

TestID: UserEndpoint4
Test Title: Unsuccessful account deletion
Test Severity: Severity 3
Instructions: Initiate a bad DELETE request to the appropriate endpoint with invalid account details.
Expected Result: Record is not found. HTTP status 404.

TestID: UserEndpoint5
Test Title: Unsuccessful account creation
Test Severity: Severity 2
Instructions: Initiate a bad POST request to the appropriate endpoint with duplicate username
Expected Result: Record conflict. HTTP status 409.
TestID: UserEndpoint6
Test Title: Successful Account Login
Test Severity: Severity 1
Instructions: Initiate a good POST request to the appropriate endpoint with valid credentials
Expected Result: POST/REDIRECT/GET pattern -> Record found. HTTP status 200. 

TestID: UserEndpoint7
Test Title: Unsuccessful Account Login
Test Severity: Severity 2
Instructions: Initiate a POST request to the appropriate endpoint with invalid credentials
Expected Result: Unauthorized. HTTP status 401. 

TestID: UserEndPoint8
Test Title: Successful GitHub repository connection 
Test Severity: Severity 2
Instructions: Initiate a good POST request to the appropriate endpoint with valid repository details
Expected Result: Record is created and success message is displayed.
 
TestID: UserEndPoint9
Test Title: Unsuccessful GitHub repository connection 
Test Severity: Severity 2
Instructions:  Initiate a good POST request to the appropriate endpoint with invalid repository details
Expected Result: Record creation fails and error message is displayed.

TestID: UserEndPoint10
Test Title: Successful Server Endpoint connections (check all three)
Test Severity: Severity 2
Instructions:  Initiate a good POST request to the appropriate endpoint with valid server (user’s) credentials
Expected Result: Server endpoints connected and credentials are stored. Success message displayed.

TestID: UserEndPoint11
Test Title: Unsuccessful Server Endpoint connections (check all three)
Test Severity: Severity 2n
Instructions:  Initiate a good POST request to the appropriate endpoint with invalid server (user’s) credentials
Expected Result: Server endpoints connection fails and credentials are stored. Error message displayed.

TestID: UserEndPoint12
Test Title: Test logs display
Test Severity: Severity 2
Instructions:  Initiate a good POST request to the appropriate endpoint with request for test logs on repository
Expected Result: Receive and display current phase of testing, along with logs previously accumulated.

TestID: UserEndPoint13
Test Title: Push Notifications on successful test completion
Test Severity: Severity 3
Instructions: Commit changes to master with non-breaking changes.
Expected Result: Notification is displayed to user indicating that tests pass on new commit to master

TestID: UserEndPoint14
Test Title: Push Notifications on unsuccessful test completion
Test Severity: Severity 3
Instructions: Commit changes to master with breaking changes.
Expected Result: Notification is displayed to user indicating that tests failed to pass on new commit to master.

TestID: UserEndPoint15
Test Title: Display details of failed test cases
Test Severity: Severity 3
Instructions: Run tests on the user’s repository that fail in a phase (Alpha, Beta and prod) 
Expected Result: Message displayed with details of the failed test cases.

TestID: UserEndPoint16
Test Title: Responsive/Adaptive UI
Test Severity: Severity 3
Instructions: Open the website on devices of different sizes.
Expected Result: The website should adapt to the dimensions of the device and maintain usable user experience throughout platforms.

TestID: BackendService1
Test Title: Github Branch Polling
Test Severity: Severity 2
Instructions: Create a pipeline to monitor a Github branch with a polling timer. Mock the GitHub api endpoint.
Expected Result: API calls requesting information for the specified branch at the specified time interval. 

TestID: BackendService2
Test Title: Get new changes from branch 
Test Severity: Severity 2
Instructions: Mock GitHub API response saying there are new commits to be released.
Expected Result: GitHub API request to clone the new changes.

TestID: BackendService3
Test Title: Good Alpha Tests
Test Severity: Severity 2
Instructions: Run alpha tests. View the generated log of the results.
Expected Result: Outputted log verifies the success of the alpha tests.

TestID: BackendService4
Test Title: Good Beta Tests
Test Severity: Severity 2
Instructions: Run beta tests. View the generated log of the results.
Expected Result: Outputted log verifies the success of the Beta tests.

TestID: BackendService5
Test Title: Good Prod Tests
Test Severity: Severity 2
Instructions: Run prod tests. View the generated log of the results.
Expected Result: Outputted log verifies the success of the Prod tests.

TestID: BackendService6
Test Title: Failing Alpha Tests
Test Severity: Severity 2
Instructions: Run alpha tests. View the generated log of the results.
Expected Result: Outputted log verifies the failure of appropriate alpha tests.

TestID: BackendService7
Test Title: Failing Beta Tests
Test Severity: Severity 2
Instructions: Run beta tests. View the generated log of the results.
Expected Result: Outputted log verifies the failure of appropriate beta tests.

TestID: BackendService8
Test Title: Failing prod Tests
Test Severity: Severity 2
Instructions: Run prod tests. View the generated log of the results.
Expected Result: Outputted log verifies the failure of appropriate prod tests.

TestID: BackendService9
Test Title: Successfully find tests
Test Severity: Severity 2
Instructions: Commit changes to the master branch with valid test folder.
Expected Result: Successfully runs all tests until all succeed or a phase fails.

TestID: BackendService10
Test Title: Unsuccessfully find tests
Test Severity: Severity 2
Instructions: Commit changes to the master branch with no test folder.
Expected Result: Display error indicating the absence of the test folder.

TestID: BackendService11
Test Title: Successfully connect to master branch of user’s repository 
Test Severity: Severity 2
Instructions: Enter correct details when adding repository
Expected Result: Code is pulled from the master branch of the repository through the GitHub API

TestID: BackendService12
Test Title: Unsuccessfully connect to master branch of user’s repository 
Test Severity: Severity 2
Instructions: Enter incorrect details when adding repository
Expected Result: API call to GitHub fails and error is displayed.

TestID: BackendService13
Test Title: Display logs of tests run on the repository
Test Severity: Severity 2
Instructions: Commit changes to the master branch and create test cases with known results. 
Expected Result: The logs of test cases shown should match the expected results.

# Instructions to Set Up a Repository to be Monitored

## Format your repository
- The application in the repository needs to be a node application.
- In the package.json in the root directory of the repo, there needs to be a script `start` which starts your application.

## Webhook
- Log into your github and go to your repository to be monitored (You must be the owner to create a webhook)
- When on the correct repository, go to the “Settings” tab near the top of the page.
- Click “Webhooks”
- Click “Add Webhook”
- Add this “http://52.200.13.118:3000/webhooks” to the payload URL
- Make sure the content-type is in the form of “application/x-www-form-urlencoded”
- Under the option of “Which events would you like to trigger this webhook?” click the “Let me select individual events” option and click “Push” and “Pull Request”. 
- Make sure the “Active” option is clicked.
- After that update your webhook and now your repository will be monitored for push and pull requests. 

## Format your tests
- In the root directory of your repository, there needs to be three folders `test-alpha`, `test-beta` and `test-prod`.
- The tests need to be written with mocha.js and chai and chai-compatible packages can be used with it.


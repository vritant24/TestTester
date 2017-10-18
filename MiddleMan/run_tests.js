var exec = require('child_process').exec;
var child;

//WORKS, BUT IF YOU TRY TO CALL THIS AFTER A DOWNLOAD IT FAILS

//cd USER_NAME; mkdir repo; tar -zxvf REPO_NAME.tar.gz --directory ./repo --strip-components=1
var unzipAndStore = (USER_NAME, REPO_NAME) => {
    var uz_command = ('cd UserRepositories; cd ' + USER_NAME + '; mkdir repo; tar -zxvf ' + REPO_NAME + '.tar.gz --directory ./repo --strip-components=1')

    child = exec(uz_command, function(error, stdout, stderr){
        if(error != null){
            console.log('exec error: ' + error)
        }
    });
}

module.exports = {
    unzipAndStore
}

//PC Jonah



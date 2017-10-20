var exec        = require('child_process').exec;
var jsonfile    = require('jsonfile');
var child;

//WORKS, BUT IF YOU TRY TO CALL THIS AFTER A DOWNLOAD IT FAILS. NEED TO WAIT

//cd USER_NAME; mkdir repo; tar -zxvf REPO_NAME.tar.gz --directory ./repo --strip-components=1
var unzipAndStore = (USER_NAME, REPO_NAME) => {
    var uz_command = ('cd UserRepositories; cd ' + USER_NAME + '; mkdir ' + REPO_NAME + '/; tar -zxvf ' + REPO_NAME + '.tar.gz --directory ./' + REPO_NAME +
    '/ --strip-components=1; rm ' + REPO_NAME + '.tar.gz')

    child = exec(uz_command, function(error, stdout, stderr){
        if(error != null){
            console.log('exec error: ' + error)
        }
    });
}


//PC Jonah

var runTestScript = (USER_NAME, REPO_NAME) => {
    var ra_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-alpha/**/*.js" --reporter json > test-alpha.json')
    var rb_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-beta/**/*.js" --reporter json > test-beta.json')
    var rp_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-prod/**/*.js" --reporter json > test-prod.json')
    
    var commandArray = [ra_command,rb_command,rp_command]

    for(var command of commandArray){
        child = exec(command, function(error, stdout, stderr){
            if(error != null){
                console.log('exec error: ' + error)
            }   
        });
    }
}

var parseScripts = (USER_NAME, REPO_NAME) => {
    console.log("TEST")
    var fileNameArray = ["test-alpha.json","test-beta.json","test-prod.json"]
    var testLogs = []
    for(var testFile of fileNameArray){
        var tempString = "./UserRepositories/" + USER_NAME + "/" + REPO_NAME + "/" + testFile
        
        jsonfile.readFileSync(tempString, (err, obj) => {
            testLogs.push(obj);
            console.log(obj)  
        })      
    }
}

module.exports = {
    unzipAndStore,
    runTestScript,
    parseScripts
}



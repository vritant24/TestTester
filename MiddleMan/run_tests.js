var exec = require('child_process').exec;
var child;

//WORKS, BUT IF YOU TRY TO CALL THIS AFTER A DOWNLOAD IT FAILS. NEED TO WAIT

//cd USER_NAME; mkdir repo; tar -zxvf REPO_NAME.tar.gz --directory ./repo --strip-components=1
var unzipAndStore = (USER_NAME, REPO_NAME) => {
  return new Promise((resolve, reject) => {
    var uz_command = ('cd UserRepositories; cd ' + USER_NAME + '; mkdir repos; mkdir repos/' + REPO_NAME + '/; tar -zxvf ' + REPO_NAME + '.tar.gz --directory ./repos/' + REPO_NAME +
      '/ --strip-components=1')
    
    child = exec(uz_command, function(error, stdout, stderr){
      if(error != null){
        console.log('exec error: ' + error)
      }
    });
  });
}


//PC Jonah

var runTestScript = (USER_NAME, REPO_NAME) => {
  return new Promise((resolve, reject) => {
    var rt_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd repos; cd ' + REPO_NAME  + '; npm test > test_results.txt')
        
    child = exec(rt_command, function(error, stdout, stderr){
      if(error != null){
        console.log('exec error: ' + error)
      }   
    });
  });
}

module.exports = {
    unzipAndStore,
    runTestScript
}



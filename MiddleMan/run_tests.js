var exec            = require('child_process').exec;
const loadJsonFile  = require('load-json-file');
var child;

//WORKS, BUT IF YOU TRY TO CALL THIS AFTER A DOWNLOAD IT FAILS. NEED TO WAIT

//cd USER_NAME; mkdir repo; tar -zxvf REPO_NAME.tar.gz --directory ./repo --strip-components=1
var unzipAndStore = (USER_NAME, REPO_NAME) => {
  return new Promise((resolve, reject) => {
    var uz_command = ('cd UserRepositories; cd ' + USER_NAME + '; mkdir ' + REPO_NAME + '/; tar -zxvf ' + REPO_NAME + '.tar.gz --directory ./' + REPO_NAME + 
    '/ --strip-components=1; rm ' + REPO_NAME + '.tar.gz')
    child = exec(uz_command, function(error, stdout, stderr){
      if(error != null){
        reject(error)
      }
      resolve()
    });
  });
}


//PC Jonah

var runTestScript = (USER_NAME, REPO_NAME) => {
    var ra_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-alpha/**/*.js" --reporter json > test-alpha.json')
    var rb_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-beta/**/*.js" --reporter json > test-beta.json')
    var rp_command = ('cd UserRepositories; cd ' + USER_NAME + '; cd ' + REPO_NAME  + '; mocha "test-prod/**/*.js" --reporter json > test-prod.json')
    
    var commandArray = [ra_command,rb_command,rp_command]
    var promises = [];
    commandArray.forEach((command) => {
        promises.push(
            new Promise((resolve, reject) => {
                child = exec(command, function(error, stdout, stderr){
                    if(error != null){
                        reject(error)
                    } else {
                        resolve()
                    }
                })
            })
        )
    })
    return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
            resolve()
        }).catch(err => reject(err))
    })
}

var parseScripts = (USER_NAME, REPO_NAME) => {
    var fileNameArray = ["test-alpha.json","test-beta.json","test-prod.json"]
    paths = fileNameArray.map((file) => "./UserRepositories/" + USER_NAME + "/" + REPO_NAME + "/" + file)
    return new Promise((resolve, reject) => {
        var promises = []
        paths.forEach((path, idx) => {
            promises.push(
                new Promise((resolve, reject) => {
                    loadJsonFile(path).then(json => {
                        if(!json) {
                            reject("json empty");
                        }
                        resolve({id: idx, log: json})  
                    }).catch((err) => reject("load file failed"))
                })
            )
        })
        Promise.all(promises).then((jsons) => {
            var arr = ['alpha', 'beta', 'prod'];
            var obj = jsons.reduce((acc, curr) => {
                acc[arr[curr.id]] = curr.log;
                return acc;
            }, {})
            resolve(obj)
        }).catch(err => reject(err))
    })
}

module.exports = {
    unzipAndStore,
    runTestScript,
    parseScripts
}



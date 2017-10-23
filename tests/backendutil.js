
var repo_id = 91724628
var github_id = 4110360

var fs = require('fs');
const fileExists = require('file-exists');
var github = require("../MiddleMan/github_com");
var db = require("../db/db");
var run_tests = require("../MiddleMan/run_tests");
var exec = require('child_process').exec;
const directoryExists = require('directory-exists');
var child;


var testUnzip = (USER_ID, REPO_ID) => {
    var dl_command = ('cd UserRepositories; mkdir -p ' + github_id +
        '; cd ' + github_id + '; ' + 'curl -L ' + 'https://api.github.com/repos/vritant24/Adwyse-Challenge/tarball' + " > " + repo_id + ".tar.gz;");

    child = exec(dl_command, function (error, stdout, stderr) {
        if (error != null) {
            console.log(error);
        }

        run_tests.unzipAndStore(USER_ID, REPO_ID).then(() => {
            var boolUnzip = directoryExists.sync("UserRepositories/4110360/91724628")
            var boolTarExists = fileExists.sync("UserRepositories/4110360/91724628.tar.gz")
            if(boolUnzip && !boolTarExists){
                console.log("Unzipping and storing works")
            }else{
                console.log("Unzipping: " + boolUnzip + ", Tar Removed: " + boolTarExists);
            }
        });
    });
}


var testScripts = (USER_ID, REPO_ID) => {
    run_tests.runTestScript(USER_ID, REPO_ID).then(() =>{
        var boolAlphaTest = fileExists.sync("UserRepositories/4110360/91724628/test-alpha.json")
        var boolBetaTest = fileExists.sync("UserRepositories/4110360/91724628/test-beta.json")
        var boolProdTest = fileExists.sync("UserRepositories/4110360/91724628/test-prod.json")
        if(boolAlphaTest && boolBetaTest ** boolProdTest){
            console.log("Runnning tests works!")
        }else{
            console.log("Alpha Exists: " + boolAlphaTest + ", Beta Exists: " + boolBetaTest + ", Prod Exists: " + boolProdTest)
        }
    
    })
}

testUnzip(github_id, repo_id)
testScripts(github_id, repo_id)



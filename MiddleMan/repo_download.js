var ghdownload = require('github-download')
var curl = require('curlrequest')


export function downloadRepo(userID, repoName){

    //curl https://api.github.com/repos/USER_NAME/REPO_NAME/tarball?access_token=ACESS_TOKEN
    //file structure: users/USER_NAME/REPO_NAME/main <--- code goes here
    var USER_NAME = userid
    var REPO_NAME = repoName
    var ACCESS_TOKEN = ""; //FIGURE OUT HOW TO QUERY THE TOKEN


    var URLString = "https://api.github.com/repos/" + USER_NAME + "/" + REPO_NAME + "/tarball?access_token=" + ACCESS_TOKEN


    ghdownload(url)

}
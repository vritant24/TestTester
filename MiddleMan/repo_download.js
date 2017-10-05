var ghdownload = require('github-download')


export function downloadRepo(url){

    ghdownload(url)

}

var downloadPrivateRepo = (repoId, access_token) => {

}

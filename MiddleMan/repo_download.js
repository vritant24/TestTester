var ghdownload = require('github-download')


module.exports = function downloadRepo(url){

    ghdownload(url)

}
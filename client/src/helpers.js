import uuid from 'uuid' // generate random string

//============= Helper Functions =============//

//Setters and Getters for the session ID
var session = {
    setSessionID    : () => (window.localStorage.session = uuid()),

    getSessionID    : () => (window.localStorage.session),

    removeSessionID : () => (window.localStorage.session = null),

    isLoggedIn      : () => (window.localStorage.session !== null)
}

//Setters and Getters for the User Data
var user = {
    setUser     : (user) => {
        window.localStorage.github_id = JSON.stringify(user.github_id)
        window.localStorage.username  = JSON.stringify(user.username)
    },
    
    getUser     : () => ({
        github_id : (window.localStorage.github_id) ? JSON.parse(window.localStorage.github_id) : null,
        username  : (window.localStorage.username)  ? JSON.parse(window.localStorage.username)  : null
    }),

    removeUser  : () => {
        window.localStorage.github_id = null
        window.localStorage.username  = null
    }
}

var api = {
    getRepoList : () => ('/repos/' + session.getSessionID()),

    getRepo     : (repo_id) => ('/repo/' + session.getSessionID() + '/' + repo_id),

    authUser    : (access_code) => ('/authenticate/' + access_code + '/' + session.getSessionID)
}

var status = {
    success     : 200,
    notFound    : 404,

}

// Export
export {
    session,
    user,
    api,
    status
}
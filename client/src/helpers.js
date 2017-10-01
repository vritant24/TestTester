import uuid from 'uuid' // generate random string

//============= Helper Functions =============//

//Setters and Getters for the session ID
var session = {
    setSessionID : () => (window.localStorage.session = uuid()),

    getSessionID : () => (window.localStorage.session),

    removeSessionId : () => {
        window.localStorage.session = null
    }
}

var user = {
    setUser : (user) => {
        window.localStorage.github_id = JSON.stringify(user.github_id)
        window.localStorage.username = JSON.stringify(user.username)
    },
    
    getUser : () => ({
        github_id   : (window.localStorage.github_id) ? JSON.parse(window.localStorage.github_id) : null,
        username    : (window.localStorage.username) ? JSON.parse(window.localStorage.username) : null
    }),

    removeUser : () => {
        window.localStorage.github_id = null
        window.localStorage.username = null
    }
}

var isLoggedIn = () => ( session.getSessionID() != null )

// Export
export {
    session,
    user,
    isLoggedIn
}
import uuid from 'uuid' // generate random string
import app  from 'ampersand-app'


//============= Helper Functions =============//

//Setters and Getters for the session ID
var session = {
    setSessionID: () => {
        app.me.session = uuid()
        window.localStorage.session = app.me.session
        return app.me.session
    },

    getSessionID: () => (app.me.session)
}

var user = {
    setUser: (user) => {
        app.me.user = user;
        window.localStorage.user = user;
    },
    
    getUser: () => (app.me.user),
}

// Export
export {
    session,
    user
}
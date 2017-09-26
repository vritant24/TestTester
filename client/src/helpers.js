import uuid from 'uuid' // generate random string
import app  from 'ampersand-app'


//============= Helper Functions =============//

//Setters and Getters for the session ID
var session = {
    setSessionID: () => {if(!app.me.token) app.me.token = uuid(); return app.me.token},
    getSessionID: () => (app.me.token)
}


// Export
export {
    session
}
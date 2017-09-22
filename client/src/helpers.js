import uuid from 'uuid' // generate random string
import app  from 'ampersand-app'


//============= Helper Functions =============//

//Setters and Getters for the session ID
var session = {
    setSessionID: () => (app.me.token = uuid()),
    getSessionID: () => (app.me.token)
}


// Export
export {
    session
}
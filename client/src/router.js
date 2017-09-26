import React                    from 'react'            // JSX
import ReactDOM                 from 'react-dom'        // show react elements
import Router                   from 'ampersand-router' // internal navigation
import qs                       from 'qs'               // create queries
import uuid                     from 'uuid'             // generate random string
import app                      from 'ampersand-app'
     
import { session }              from './helpers'
import { Repos, User, Landing } from './pages' 

export default Router.extend({
    // the routes with the functions they call ( route : function_name )
    routes: {
        ''       : 'landing',
        'login'  : 'login',
        'logout' : 'logout',
        'repos'  : 'repos',
        'user'   : 'user',
         
        'auth/callback?:query' : 'authCallback',
    },

    // functions called for each route
    landing() {
        renderPage(<Landing/>)
    },

    login () {
        const state = uuid();
        window.localStorage.state = state;
        window.location = 'http://github.com/login/oauth/authorize?' + qs.stringify({
            client_id       : '2a48dc27e13bf25eca10',
            redirect_uri    : window.location.origin + '/auth/callback',
            scope           : 'user:email,repo,write:repo_hook',
            state           : state,  
        })
    }, 

    logout () {
       window.localStorage.clear()

       // send something to server

       // redirect to root route
       window.location = '/'
    },

    authCallback (query) {
        //get code and state from query 
        query = qs.parse(query)

        if(query.state === window.localStorage.state) {
            window.localStorage.state = null; //remove state

            //send code to server along with a session id to be redirected to dashboard with userid
            var sessionID = session.setSessionID()

            fetch('/authenticate/' + query.code + '/' + sessionID)  // '/authenticate/:access_code/:session_id'
            .then(res => res.json())                                //receive response and convert to JSON
            .then(res => {
                // redirect to repos
                this.redirectTo('/repos')
            });

        } else {
            window.localStorage.state = null; //remove state
            console.log("uh oh")
        }
    },

    repos () {
        renderPage(<Repos/>)
    },

    user () {
        renderPage(<User/>)
    },
 })

 //Render's the given page using the react dom
 var renderPage = (component) => {
    ReactDOM.render(component, document.getElementById('root')
    )
 }
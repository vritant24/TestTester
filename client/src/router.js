import React                    from 'react'            // JSX
import ReactDOM                 from 'react-dom'        // show react elements
import Router                   from 'ampersand-router' // internal navigation
import qs                       from 'qs'               // create queries
import uuid                     from 'uuid'             // generate random string
import xhr                      from 'xhr'              // http request with server
import { Repos, User }   from './pages'
// import app              from 'ampersand-app'

export default Router.extend({
    // the routes
    routes: {
        ''              : 'login',
        'logout'        : 'logout',
        'repos'  : 'repos',
        'user'   : 'user',

        'auth/callback?:query' : 'authCallback',
    },

    // functions called for each route
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
       
    },
    authCallback (query) {
        //get code and state from query 
        query = qs.parse(query)

        if(query.state === window.localStorage.state) {
            window.localStorage.state = null; //remove state

            //send code to server along with a session id to be redirected to dashboard with userid
            var session = uuid() // session id
            window.localStorage.SquareCISessionID = session;
            
            
            fetch('/authenticate/' + query.code + '/' + session)
            .then(res => res.json())
            .then(res => console.log(res));

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
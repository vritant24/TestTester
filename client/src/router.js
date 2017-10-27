import React                    from 'react'            // JSX
import ReactDOM                 from 'react-dom'        // show react elements
import Router                   from 'ampersand-router' // internal navigation
import qs                       from 'qs'               // create queries
import uuid                     from 'uuid'             // generate random string
     
import { session, user, api, status }               from './helpers'
import { Repos, Landing, Repository, NotFound }     from './pages' 

export default Router.extend({
    // the routes with the functions they call ( route : function_name )
    routes: {
        ''          : 'landing',
        'login'     : 'login',
        'logout'    : 'logout',
        'repos'     : 'repos',
        'notfound'  : 'notFound',
        'repo/:repo_id/:repo_name': 'repoPage',
        'auth/callback?:query'   : 'authCallback',

        '*404' : 'notFound'      
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

            //create session ID
            session.setSessionID()

            //fetch user data from server using access code given by github
            fetch(api.authUser(query.code)) 
            .then(res => res.json())                                
            .then(res => {
                if(res.status === status.ok) {
                    //add user data to global object
                    user.setUser(res.user)    
                    //redirect to repos
                    this.redirectTo('/repos')
                } else {
                    session.removeSessionID()
                    console.log("user login failed")
                }
            })
            .catch(function(error) {
                session.removeSessionID()
                console.log(error)
                console.log("Server Auth Failed")
            });

        } else {
            window.localStorage.state = null; //remove state
            session.removeSessionID()
            console.log("GitHub Auth Failed")
        }
    },

    repos () {
        renderPage(<Repos/>)
    },

    repoPage (repo_id, repo_name) {
        renderPage(<Repository repoID={repo_id} repoName={repo_name}/>)
    },

    notFound () {
        renderPage(<NotFound/>)
    }
 })
 
 //Render's the given page using the react dom
 var renderPage = (component) => {
    ReactDOM.render(component, document.getElementById('root')
    )
 }
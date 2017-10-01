import React                    from 'react'            // JSX
import ReactDOM                 from 'react-dom'        // show react elements
import Router                   from 'ampersand-router' // internal navigation
import qs                       from 'qs'               // create queries
import uuid                     from 'uuid'             // generate random string
     
import { session, user }        from './helpers'
import { Repos, User, Landing, Repository, NotFound }   from './pages' 

export default Router.extend({
    // the routes with the functions they call ( route : function_name )
    routes: {
        ''          : 'landing',
        'login'     : 'login',
        'logout'    : 'logout',
        'repos'     : 'repos',
        'user'      : 'user',
        'notfound'  : 'notFound',

        'repo/:repo_id'         : 'repoPage',
        'auth/callback?:query'   : 'authCallback',
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

            //fetch user data from server using access code given by github
            fetch('/authenticate/' + query.code + '/' + sessionID) 
            .then(res => res.json())                                
            .then(res => {
                if(res.status === 200) {
                    //add user data to global object
                    user.setUser(res.user)    
                    //redirect to repos
                    this.redirectTo('/repos')
                } else {
                    session.removeSessionId()
                    console.log("user login failed")
                }
            })
            .catch(function(error) {
                session.removeSessionId()
                console.log(error)
                console.log("Server Auth Failed")
            });

        } else {
            window.localStorage.state = null; //remove state
            session.removeSessionId()
            console.log("GitHub Auth Failed")
        }
    },

    repos () {
        renderPage(<Repos/>)
    },

    user () {
        renderPage(<User/>)
    },

    repoPage (repo_id) {
        renderPage(<Repository repoID={repo_id}/>)
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
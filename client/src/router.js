import React                    from 'react';
import ReactDOM                 from 'react-dom';
import Router                   from 'ampersand-router'
import { Repos, User }      from './pages'
// import app              from 'ampersand-app'

export default Router.extend({
    routes: {
        ''        : 'login',
        'repos'   : 'repos',
        'user'    : 'user',
    },

    public () {
        console.log('login')
    }, 
    dashboard () {
        renderPage(<Repos/>)
    },
    user() {
        renderPage(<User/>)
    }
 })

 //Render's the given page using the react dom
 var renderPage = (component) => {
    ReactDOM.render(component, document.getElementById('root')
    )
 }
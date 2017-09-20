import Router           from 'ampersand-router'
import React            from 'react';
import { Dashboard }    from './pages'
import ReactDOM         from 'react-dom';

export default Router.extend({
    routes: {
        '': 'public',
        'dashboard': 'dashboard'
    },

    public () {
        console.log('public')
    }, 
    dashboard () {
        ReactDOM.render(<Dashboard />, document.getElementById('root'))
    }
 })
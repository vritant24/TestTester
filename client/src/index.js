import Router   from './router'
import app      from 'ampersand-app'

//expose app to browser console
window.app = app

//global app between routes
app.extend({
    init() {
        this.router = new Router()
        this.router.history.start()
    }
})

app.init()
import Router   from './router'
import app      from 'ampersand-app'
import Me       from './models/me'

//expose app to browser console
window.app = app

//global app between routes
app.extend({
    init() {
        this.me = new Me()
        this.router = new Router()
        this.router.history.start()
    }
})

app.init()
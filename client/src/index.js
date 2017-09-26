import Router   from './router'
import app      from 'ampersand-app'
<<<<<<< HEAD
=======
import Me       from './models/me'
>>>>>>> master

//expose app to browser console
window.app = app

//global app between routes
app.extend({
    init() {
<<<<<<< HEAD
=======
        this.me = new Me()
>>>>>>> master
        this.router = new Router()
        this.router.history.start()
    }
})

app.init()
import Model from 'ampersand-model'

//User data on client 

export default Model.extend({
    initialize() {
        this.session = window.localStorage.session,
        this.on('change:session', this.onChangeSession)
    },

    user: {
        github_id   : 'number',
        username    : 'string',
    },

    session: {
        session     : 'string'
    },

    onChangeSession () {
        window.localStorage.session = this.session
    }
})
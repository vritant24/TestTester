import Model from 'ampersand-model'

//User data on client 

export default Model.extend({
    initialize() {
        this.session = window.localStorage.session,
        this.on('change:session', this.onChangeSession)
    },

    props: {
        id      : 'number',
        login   : 'string',

    },

    session: {
        session   : 'string'
    },

    onChangeSession () {
        window.localStorage.session = this.session
    }
})
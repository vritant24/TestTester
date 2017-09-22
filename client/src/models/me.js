import Model from 'ampersand-model'

//User data on client 

export default Model.extend({
    initialize() {
        this.token = window.localStorage.token,
        this.on('change:token', this.onChangeToken)
    },

    props: {
        id      : 'number',
        login   : 'string',

    },

    session: {
        token   : 'string'
    },

    onChangeToken () {
        window.localStorage.token = this.token
    }
})
import React, { Component } from 'react';
import localLinks           from 'local-links'
import app                  from 'ampersand-app'

export default class LocalLink extends Component {
    gotToLocalLink (event) {
        //see if it is a local link or external
        const pathName = localLinks.getLocalPathname(event)

        //if local link, navigate using router (no page refresh)
        if (pathName) {
            app.router.history.navigate(pathName)
        }
    }
    render() {
        return (
            <div onClick={this.gotToLocalLink.bind(this)}>
                {this.props.children}
            </div>
        )
    }
}
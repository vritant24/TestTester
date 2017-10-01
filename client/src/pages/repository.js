import React, { Component } from 'react';

import { session }          from '../helpers'

export default class Repository extends Component {
    componentWillMount() {
        //check if user logged in
        if(!session.isLoggedIn()) {
            window.location = '/'
        }
    }

    render() {
        return (
            <h1>{this.props.repoID}</h1>
        )
    } 
} 
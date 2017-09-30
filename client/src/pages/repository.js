import React, { Component } from 'react';

export default class Repository extends Component {
    render() {
        console.log("repo")
        return (
            <h1>{this.props.repoID}</h1>
        )
    } 
} 
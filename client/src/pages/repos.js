import React, { Component }     from 'react';
import { LocalLink }            from '../components'

export default class Repos extends Component {
    constructor(props) {
        super(props)
    }
   
    render() {
        return (
            <LocalLink>
                <h1>Repositories</h1>
                <a href="user"> go to user page </a>
            </LocalLink>
        )
    }
}
import React, { Component }     from 'react';
import { user }                 from  '../helpers'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null 
        }
    }

    componentWillMount() {
        this.setState({
            username: user.getUser().username
        })
    }

    render() {
        return (
            <nav>
                <h4>User : {this.state.username}</h4>
            </nav>  
        )   
    }
}
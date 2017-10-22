import React, { Component }         from 'react';

import { NavBar }                   from '../components'
import { session, api, status }     from '../helpers'

export default class Repository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repo_name           : this.props.repoName,
            repo_id             : this.props.repoID,
            server_endpoints    : null,
            test_logs           : null,
            error               : false,
            error_string        : null
        }
    }

    componentWillMount() {
        //check if user logged in
        if(!session.isLoggedIn()) {
            window.location = '/'
        }
        else {
            console.log(this.state.repo_id)
            fetch(api.getRepo(this.state.repo_id))
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if(res.status === status.ok) {
                    this.setState({
                        error               : false,
                        server_endpoints    : res.server_endpoints,
                        test_logs           : res.test_logs    
                    })
                } else {
                    this.setState ({ 
                        error           : true,
                        error_string    : "repository not found " + res.status
                    })
                    console.log("error : repo not found")
                }
            })
            .catch((error) => {
                this.setState ({ 
                    error           : true,
                    error_string    : "encountered error in parsing http response "
                })
                console.log(error)
            })
        }
    }

    render() {
        var s_ends = this.state.server_endpoints
        var t_logs = this.state.test_logs
        var ends = (s_ends) ? s_ends.map( (s_e) => <li key={s_e}>{s_e}</li> ) : null
        // var logs = (t_logs) ? t_logs.map( (log) => <li key={log}>{log}</li> ) : null
        var showError = this.state.error_string

        return (
            <div>
                <NavBar/>
                <h2>{this.state.repo_name}</h2>
                {this.state.error && showError}
                <br/>
                <h3>Server Endpoints</h3>
                <ul>
                    {ends}
                </ul>
                <h3>Test Logs</h3>
                <ul>
                    
                </ul>
            </div>
        )
    } 
} 
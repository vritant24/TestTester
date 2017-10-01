import React, { Component }         from 'react';
import { session, api, status }     from '../helpers'

export default class Repository extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repo_name           : null,
            repo_id             : this.props.repo_id,
            server_endpoints    : null,
            test_logs           : null
        }
    }
    
    componentWillMount() {
        //check if user logged in
        if(!session.isLoggedIn()) {
            window.location = '/'
        }
        else {
            fetch(api.getRepo())
            .then(res => res.json())
            .then(res => {
                if(res.status === status.success) {
                    this.setState({
                        repo_name           : res.repo_name,
                        server_endpoints    : res.server_endpoints,
                        test_logs           : res.test_logs    
                    })
                } else {
                    console.log("error : repo not found")
                }
            })
            .catch((error) => console.log(error))
        }
    }

    render() {
        var s_ends = this.state.server_endpoints
        var t_logs = this.state.test_logs
        var ends = (s_ends) ? s_ends.map( (s_e) => <li key={s_e}>{s_e}</li> ) : null
        var logs = (t_logs) ? t_logs.map( (log) => <li key={log}>{log}</li> ) : null
        return (
            <div>
                <h1>{this.props.repoID}</h1>
                <h2>{this.state.repo_name}</h2>
                <br/>
                <h3>Server Endpoints</h3>
                <ul>
                    {ends}
                </ul>
                <h3>Test Logs</h3>
                <ul>
                    {logs}
                </ul>
            </div>
        )
    } 
} 
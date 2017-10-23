import React, { Component }         from 'react'
import styled                       from 'styled-components'
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
                if(res.status === status.ok) {
                    this.setState({
                        error               : false,
                        server_endpoints    : res.server_endpoints,
                        test_logs           : res.test_logs    
                    })
                } else {
                    this.setState ({ 
                        error           : true,
                        error_string    : "repository not found or was not formatted properly" + res.status
                    })
                    console.log("error : repo not found or was not formatted properly")
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

    formatFailedTests(failures) {
        return failures.map(test => (
            <FailLi>
                <h4>{test.fullTitle}</h4>
                <hr/>
                <h4>{test.err.message}</h4>
                <p>{test.err.stack}</p>
            </FailLi>
        ))
    }

    formatPassedTests(failures) {
        return failures.map(test => (
            <PassLi>
                <h4>{test.fullTitle}</h4>
            </PassLi>
        ))
    }

    formatTests(alpha, beta, prod) {
        var alpha_fail  = this.formatFailedTests(alpha.failures)
        var beta_fail   = this.formatFailedTests(beta.failures)
        var prod_fail   = this.formatFailedTests(prod.failures)

        var alpha_pass  = this.formatPassedTests(alpha.passes)
        var beta_pass   = this.formatPassedTests(beta.passes)
        var prod_pass   = this.formatPassedTests(prod.passes)

        return (
            <div>
                <h3>Alpha Tests</h3>
                <ul>{alpha_fail}</ul>
                <ul>{alpha_pass}</ul>

                <h3>Beta Tests</h3>
                <ul>{beta_fail}</ul>
                <ul>{beta_pass}</ul>

                <h3>Prod Tests</h3>
                <ul>{prod_fail}</ul>
                <ul>{prod_pass}</ul>
            </div>
        )
        
    }

    render() {
        var s_ends      = this.state.server_endpoints
        var t_logs      = this.state.test_logs
        var test_list

        var ends = (s_ends) ? s_ends.map( (s_e) => <li key={s_e.port}>{s_e.port}</li> ) : null
        
        var alpha_tests = (t_logs) ? t_logs.alpha : null;
        var beta_tests  = (t_logs) ? t_logs.beta  : null;
        var prod_tests  = (t_logs) ? t_logs.prod  : null;

        if(alpha_tests && beta_tests && prod_tests) {
            test_list = this.formatTests(alpha_tests, beta_tests, prod_tests);
        }
       
        return (
            <div>
                <NavBar/>
                <h2>{this.state.repo_name}</h2>
                {this.state.error && this.state.error_string}
                <br/>
                <h3>Server Endpoints</h3>
                <ul>
                    {ends}
                </ul>
                <h2>Test Logs</h2>
                {test_list}
            </div>
        )
    } 
} 


var FailLi = styled.li`
    background  : #b84141;
    color       : white;
    padding     : 1px 5px;
    margin      : 2px;
`;

var PassLi = styled.li`
    background  : #389c58;
    color       : white;
    padding     : 1px 5px; 
    margin      : 2px;
`;
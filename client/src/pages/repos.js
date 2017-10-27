import React, { Component }         from 'react';
import styled                       from 'styled-components'
import app                          from 'ampersand-app'

import { Repository, NavBar }           from '../components'
import { session, user, api, status }   from '../helpers'

var RepoContainer = styled.div`
    display             : flex;
    justify-content     : space-around;
    flex-wrap           : wrap;
`;

export default class Repos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            repos           : null,
            error           : false,
            error_string    : null,
            select_value    : null
        }
    }
   
    componentWillMount() {
        //check if user logged in
        if(!session.isLoggedIn()) {
            window.location = '/'
        }
        else {
            fetch(api.getRepoList())
            .then(res => res.json())
            .then(res => {
                if(res.status === status.ok) {
                    //check if right user
                    if(user.getUser().github_id !== res.github_id) {
                        this.setState ({ 
                            error           : true,
                            error_string    : "encountered error user doesn't match "
                        })
                        console.log("wrong user")

                    } 
                    else {
                        this.setState({ 
                            repos : res.repo_list, 
                            error : false 
                        })
                    }
                } 
                else if(res.status === status.unauthorised){
                    window.location = '/'
                } 
                else {
                    this.setState ({ 
                        error           : true,
                        error_string    : "encountered error in getting repos " + res.status
                    })
                    console.log(res)
                }
            })
            .catch((error) => {
                this.setState ({ 
                    error           : true,
                    error_string    : "encountered error recceiving in http response "
                })
                console.log(error)
            })
        }
    }

    onRepoClick(repo_id, repo_name) {
        //internal navigation
        var url = '/repo/' + repo_id + '/' + repo_name;
        app.router.history.navigate(url)
    }

    monitorRepo() {
        var repo_id;
        if(this.state.select_value + 1 == this.state.repos.length) {
            repo_id = this.state.repos[0].repoId;
        }
        repo_id = this.state.repos[this.state.select_value + 1].repoId;
        url = api.monitorRepo(repo_id)
        if(repo_id) {
            repo_id = repo_id + ""
            fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.status === status.ok) {
                    var newlist = this.state.repos.slice(0)
                    newlist[this.state.select_value].isMonitored = 1;
                    this.setState({
                        error: false,
                        repos: newlist
                    })
                    console.log("monitored")
                }
                else if(res.status === status.test_run_failure) {
                    this.setState ({ 
                        error           : true,
                        error_string    : "repository not formatted properly. Please follow instructions " + res.status
                    })
                    console.log("error : repo not formatted properly. Please follow instructions")
                } 
                else {
                    this.setState ({ 
                        error           : true,
                        error_string    : "encountered error in monitoring repo " + res.status
                    })
                    console.log("failed monitoring")
                }
            })
            .catch((error) => {
                this.setState ({ 
                    error           : true,
                    error_string    : "encountered error in receiving http response "
                })
                console.log(error)
            })
        }
    }

    dontMonitorRepo(repo_id, idx) {
        var url = api.dontMonitorRepo(repo_id)
        
        if(repo_id) {
            repo_id = repo_id + ""
            fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.status === status.ok) {
                    var newlist = this.state.repos.slice(0)
                    newlist[idx].isMonitored = 0;
                    this.setState({
                        error: false,
                        repos: newlist
                    })
                    console.log("unmonitored")
                }
                else {
                    this.setState ({ 
                        error           : true,
                        error_string    : "encountered error in unmonitoring repo " + res.status
                    })
                    console.log("failed unmonitored")
                }
            })
            .catch((error) => {
                this.setState ({ 
                    error           : true,
                    error_string    : "encountered error in receiving http response "
                })
                console.log(error)
            })
        }
    }

    onselectChange(event) {
        this.setState({
            select_value : event.target.value
        })
    }

    render() {
        var repos = this.state.repos
        var repo;
        var idx;
        
        var monitored_repo_list = [];
        for(idx in repos) {
            repo = repos[idx];
            if(repo.isMonitored === 1) {
                monitored_repo_list.push(
                    <Repository 
                    repoName={repo.repoName} 
                    onclick={this.onRepoClick.bind(this,repo.repoId, repo.repoName)} 
                    ondelete={this.dontMonitorRepo.bind(this, repo.repoId, idx)} 
                    key={repo.repoId} />
                )
            }
        }

        var unmonitored_repo_list = [];
        for(idx in repos) {
            repo = repos[idx];
            if(repo.isMonitored === 0) {
                unmonitored_repo_list.push(
                    <option key={repo.repoId} value={idx}>
                        {repo.repoName}
                    </option>
                )
            }
        }

        var empty = <option key={"#31"} value={-1}></option>
        if(unmonitored_repo_list)
            unmonitored_repo_list = [empty, ...unmonitored_repo_list]
   
        //There was an error    
        var showError = this.state.error_string

        return (
            <div>
                <NavBar/>
                <h1>Repositories</h1>
                {this.state.error && showError}
                <h3>for instructions on formatting your repository, go <a href="https://github.com/vritant24/TestTester/blob/master/docs/instructions.md">here</a></h3> 
                <RepoContainer>
                    {monitored_repo_list}
                </RepoContainer>
                <br/>
                <select id="monitor_repo" onChange={this.onselectChange.bind(this)}>
                    {unmonitored_repo_list}
                </select>
                <button onClick={this.monitorRepo.bind(this)}>
                    add repo
                </button>
            </div>
        )
    }
}


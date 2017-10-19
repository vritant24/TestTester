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
                if(res.status === status.success) {
                    //check if right user
                    if(user.getUser().github_id !== res.github_id) {
                        this.setState ({ error : true })
                        console.log("wrong user")
                    } 
                    else {
                        this.setState({ 
                            repos : res.repo_list, 
                            error : false 
                        })
                    }
                } 
                //check for expired session
                else {
                    this.setState ({ error : true })
                    console.log(res)
                }
            })
            .catch((error) => console.log(error))
        }
    }

    onRepoClick(repo_id) {
        //internal navigation
        var url = '/repo/' + repo_id;
        app.router.history.navigate(url)
    }

    async apiCallMontioring(url, repo_id, err) {
        repo_id = repo_id + ""
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.status === status.success) {
               return true
            }
            else {
                this.setState ({ error : true })
                return false;
            }
        })
        .catch((error) => console.log(error))
    }
    
    monitorRepo() {
        var repo_id = this.state.repos[this.state.select_value].repoId
        var url = api.monitorRepo(repo_id)
        if(repo_id) {
            repo_id = repo_id + ""
            fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.status === status.success) {
                    var newlist = this.state.repos.slice(0)
                    newlist[this.state.select_value].isMonitored = 1;
                    console.log(newlist)
                    this.setState({
                        repos: newlist
                    })
                    console.log("monitored")
                }
                else {
                    this.setState ({ error : true })
                    console.log("failed monitoring")
                }
            })
            .catch((error) => console.log(error))
        }
    }

    dontMonitorRepo(repo_id, idx) {
        var url = api.dontMonitorRepo(repo_id)
        
        if(repo_id) {
            repo_id = repo_id + ""
            fetch(url)
            .then(res => res.json())
            .then(res => {
                if(res.status === status.success) {
                    var newlist = this.state.repos.slice(0)
                    newlist[idx].isMonitored = 0;
                    this.setState({
                        repos: newlist
                    })
                    console.log("unmonitored")
                }
                else {
                    this.setState ({ error : true })
                    console.log("failed unmonitored")
                }
            })
            .catch((error) => console.log(error))
        }
    }

    onselectChange(event) {
        this.setState({
            select_value : event.target.value
        })
    }

    render() {
        var repos = this.state.repos
        var monitored_repo_list = (repos) 
            ?   repos.filter(repo => repo.isMonitored !== 0).map( (repo, index) => {
                    return  (
                        <Repository 
                        repoName={repo.repoName} 
                        onclick={this.onRepoClick.bind(this,repo.repoId)} 
                        ondelete={this.dontMonitorRepo.bind(this, repo.repoId, index)} 
                        key={repo.repoId} />
                    )
                })
            :   null
        
        var unmonitored_repo_list = (repos)
            ?   repos.filter(repo => repo.isMonitored === 0).map( (repo, index) => {
                    return  (
                        <option key={repo.repoId} value={index}>
                            {repo.repoName}
                        </option>
                    )
                })
            :   null

        var empty = <option key={"#31"} value={-1}></option>
        if(unmonitored_repo_list)
            unmonitored_repo_list = [empty, ...unmonitored_repo_list]
   
        //There was an error    
        var showError = "THERE WAS AN ERROR"

        return (
            <div>
                <NavBar/>
                <h1>Repositories</h1>
                {this.state.error && showError}
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


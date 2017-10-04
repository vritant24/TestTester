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
                        this.setState({ repos : res.repo_list, 
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

    apiCallMontioring(url, repo_id, err) {
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.status === status.success) {
                if(res.repo_id !== repo_id) {
                    console.log(typeof repo_id)
                    console.log(typeof res.repo_id)
                    console.log(err)
                } 
                else {
                    this.setState({ 
                        repos : res.repo_list, 
                        error : false 
                    })
                }
            }
            else {
                this.setState ({ error : true })
                console.log(res)
            }
        })
        .catch((error) => console.log(error))
    }
    monitorRepo() {
        var repo_id = this.state.select_value
        if(repo_id) {
            this.apiCallMontioring(api.monitorRepo(repo_id), repo_id, "wrong repo")
        }
    }

    dontMonitorRepo(repo_id) {
        this.apiCallMontioring(api.dontMonitorRepo(repo_id), repo_id, "wrong repo")
    }

    onselectChange(event) {
        this.setState({
            select_value : event.target.value
        })
    }

    render() {
        var repos = this.state.repos
        var monitored_repo_list = (repos) 
            ?   repos.map( repo => {
                    if(repo.is_monitored) 
                        return  (
                            <Repository 
                            repoName={repo.repo_name} 
                            onclick={this.onRepoClick.bind(this,repo.repo_id)} 
                            ondelete={this.dontMonitorRepo.bind(this, repo.repo_id)} 
                            key={repo.repo_id} />
                        )
                })
            :   null
        
        var unmonitored_repo_list = (repos)
            ?   repos.filter(repo => repo.is_monitored).map( repo => {
                    return  (
                        <option key={repo.repo_id} value={repo.repo_id}>
                            {repo.repo_name}
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


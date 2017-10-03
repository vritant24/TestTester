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
            repos : null,
            error : false
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
                    console.log(repo_id)
                    console.log(res.repo_id)
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
    monitorRepo(repo_id) {
        this.apiCallMontioring(api.monitorRepo(repo_id), repo_id, "wrong repo")
    }

    dontMonitorRepo(repo_id) {
        this.apiCallMontioring(api.dontMonitorRepo(repo_id), repo_id, "wrong repo")
    }

    render() {
        var repos = this.state.repos
        var repoList = (repos) 
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
         
        //There was an error    
        var showError = "THERE WAS AN ERROR"

        return (
            <div>
                <NavBar/>
                <h1>Repositories</h1>
                {this.state.error && showError}
                <RepoContainer>
                    {repoList}
                </RepoContainer>
            </div>
        )
    }
}


import React, { Component }     from 'react';
import styled                   from 'styled-components'
import { Repository }           from '../components'
import { session, user }        from '../helpers'

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
        //Will Change
        fetch('/repos/' + session.getSessionID())
        .then(res => res.json())
        .then(res => {
            
            if(res.status === 200) {
                //check if right user
                if(user.getUser().github_id !== res.github_id) {
                    this.setState ({ error : true })
                    console.log("wrong user")
                } 
                else {
                    this.setState({ repos : res.repo_list })
                }
            } 
            else {
                this.setState ({ error : true })
                console.log(res)
            }
        })
        .catch(function(error) {
            console.log(error)
        })
    }
    render() {
        // Will Change 
        var repos = this.state.repos
        var repoList = (repos) 
            ? 
                repos.map( repo => {
                    if(repo.is_monitored) 
                        return <Repository repoName={repo.repo_name} key={repo.repo_id}/> 
                })
            : 
                null
        var showError = "THERE WAS AN ERROR"

        return (
            <div>
                <a href="/user"> go to user page </a>
                <h1>Repositories</h1>
                {this.state.error && showError}
                <RepoContainer>
                    {repoList}
                </RepoContainer>
            </div>
        )
    }
}


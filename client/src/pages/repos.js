<<<<<<< HEAD
import React, { Component }         from 'react';
import styled                       from 'styled-components'
import { LocalLink, Repository }    from '../components'

=======
import React, { Component }     from 'react';
import styled                   from 'styled-components'
import { Repository }           from '../components'
import { session }              from '../helpers'
>>>>>>> master

var RepoContainer = styled.div`
    display             : flex;
    justify-content     : space-around;
    flex-wrap           : wrap;
`;

export default class Repos extends Component {
    constructor(props) {
<<<<<<< HEAD
        super(props);
        this.repos = ["1", "2", "3", "4"];
    }
   
    render() {
        var repoList = this.repos.map( name => <Repository repoName={name} key={name}/>)
        return (
            <LocalLink>
                <a href="user"> go to user page </a>
                <h1>Repositories</h1>
                <RepoContainer>
                    {repoList}
                </RepoContainer>
            </LocalLink>
=======
        super(props)
        this.state = {
            repos : null,
            error : false
        }
    }
   
    componentWillMount() {
        //Will Change
        console.log(session.getSessionID())
        fetch('/repository/' + session.getSessionID())
        .then(res => res.json())
        .then(res => {

            // change to res.repositories in the future
            if(res && res.constructor === Array) {
                this.setState({
                    repos : res,
                    error : false 
                })
            } else {
                this.setState ({
                    repos : null,
                    error : true
                })
            }
        })
    }
    render() {

        // Will Change 

        var repos = this.state.repos
        var repoList = (repos) ? repos.map( name => <Repository repoName={name} key={name}/>) : null
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
>>>>>>> master
        )
    }
}


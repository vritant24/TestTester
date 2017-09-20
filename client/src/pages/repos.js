import React, { Component }         from 'react';
import styled                       from 'styled-components'
import { LocalLink, Repository }    from '../components'


var RepoContainer = styled.div`
    display             : flex;
    justify-content     : space-around;
    flex-wrap           : wrap;
`;

export default class Repos extends Component {
    constructor(props) {
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
        )
    }
}


import React    from 'react';
import styled   from 'styled-components'


var Repo = styled.div`
    width       : 200px;
    height      : 200px;
    background  : #222222;
    margin      : 10px 10px;
    color       : #eeeeee;
`;

export default function Repository(props) {
    return (
        <Repo>
            <h3>{props.repoName}</h3>
        </Repo>
    )
}
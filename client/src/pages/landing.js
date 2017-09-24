import React    from 'react'
import styled   from 'styled-components'


var Container = styled.div`
    width           : 100vh;
    height          : 100vh;
    
    display         : flex;
    justify-content : center;
    align-items     : center;
`;

var LoginButton = styled.a`
    -webkit-appearance  : button;
    -moz-appearance     : button;
    appearance          : button;

    text-decoration     : none;
    color               : initial;
    padding             : 10px 10px;
    background          : #222222;
    color:              : #eeeeee;

    align-self          : center;
`;

export default function Landing(props) {
    return(
        <Container>
            <LoginButton href='/login'>Login with GitHub</LoginButton>
        </Container>
    )
}
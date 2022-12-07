import React from 'react';
import styled from 'styled-components';

import logo from "./437logo.png";

export const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    width: 100vw;
    overflow: hidden;
    height: 20%;
    border-radius: 0px 0px 30px 30px;
    background-color: #FFFFFF;
    color: #50C878;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
    top: 0;
    margin-bottom: 75px;
`

export const Heading = styled.p`
    font-family: 'Overpass', sans-serif;    
    font-size: 100px;
    color: #6BA64B;
    margin-top: 15px;
    margin: auto;
`

function Navigation() {    
    return (
        <NavBar>
            <Heading>AisleHound</Heading>
        </NavBar>
    );
}

export default Navigation;
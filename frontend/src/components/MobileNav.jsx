import React, { useState } from 'react'
import styled from 'styled-components'
import { FiAlignRight } from "react-icons/fi";
import { links } from '../constants';
import { Link } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';

const MobileNav = () => {
    const [clicked, setClicked] = useState(false)
  return (
    <Container>
        <FiAlignRight size={25} onClick={() => setClicked(c => !c)}/>
        <div className={`sidebar ${clicked ? "visible" : 'hidden'}`}>
            <div className="filter" onClick={() => setClicked(false)}/>
            <div className="sidebar-container" >
                <FaPowerOff/>
                <ul className="links flex">
                {links.map(({ name, link }) => {
                return (
                    <li key={name}>
                    <Link to={link}>{name}</Link>
                    </li>
                );
                })}
                </ul>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div `
    @media only screen and (min-width: 768px){
        display:none;
    }
    svg{
        cursor:pointer;
    }
    .flex{
        display:flex;
        flex-direction:column;
        list-style:none;
        gap:20px;
        padding: clamp(10px,10vw,100px);
    }
    .links{
        a{
            text-decoration:none;
            font-size: 20px;
            color:white;
            font-weight: semi-cold;
            :hover{
                color: #ff2f2f;
            }
        }
    }
    .sidebar{
        position:absolute;
        top:0;
        height: 100vh;
        width: 100%;
    }
    .visible{
        right:0;
        opacity:1;
        transition: 0.2s ease-in-out;
    }
    .hidden{
        opacity:0;
        right: -100%;
        transition: 0.2s ease-in-out;
    }
    .filter{
        backdrop-filter:blur(1px) brightness(50%);
        height:100%;
    }
    .sidebar-container{
        position:absolute;
        top:0;
        right:0;
        background: #050010;
        height: 100vh;
        width:50%;
        svg {
            color: #f34242;
            font-size: 1.2rem;
            width:100%;
            margin-top: 4vh;
        }
    }
`
export default MobileNav
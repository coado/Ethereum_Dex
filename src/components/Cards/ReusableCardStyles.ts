import styled, { keyframes } from "styled-components";

export const Container = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
-webkit-backdrop-filter: blur(0.3rem);
backdrop-filter: blur(0.3rem);
z-index: 1000;
position: fixed;
top: 1rem;
`

export const show = keyframes`

0% {
    opacity: 0;
}
100% {
    opacity: 1;
}
`

interface ICard {
    width: number;
    height: number;
}

export const Card = styled.div<ICard>`
width: ${props => `${props.width}rem`};
height: ${props => `${props.height}rem`};
position: fixed;
background-color: #1b1426;
animation: ${show} 0.3s cubic-bezier(0.05, 0.2, 0.9, 1) forwards;
border-radius: 1rem;
display: flex;
flex-direction: column;
align-items: center;
overflow: hidden;
position: relative;
border: 1px solid #00e0c4;
transition: all 0.2s;
`

export const CloseSign = styled.span`
position: absolute;
top: 1rem;
right: 1rem;
color: #00e0c4;
cursor: pointer;
transition: all .2s;

    &:hover {
        color: #A3E4DD;
    }
`

interface IText {
    margin?: string;
    fontSize?: number;
    letterSpacing?: number;
}

export const Text = styled.h1<IText>`
    font-size: ${props => props.fontSize ? `${props.fontSize}rem` : '1rem'};
    color: #12eba7;
    margin: ${props => props.margin || 0};
    letter-spacing: ${props => `${props.letterSpacing}rem`};
`
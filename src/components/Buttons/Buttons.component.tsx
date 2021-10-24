import React from 'react';
import styled from 'styled-components';

interface IBtn {
  buttonWidth?: number;
}

export const DefaultButton = styled.button<IBtn>`
    border: none;
    color: black;
    background: #12eba7;
    width: ${props => props.buttonWidth || 100}%;
    padding: 0.8rem 0;
    opacity: 0.8;
    border-radius: 0.5rem;
    cursor: pointer;
    font-family: 'Baloo 2', cursive;
    letter-spacing: 0.1rem;
    margin-bottom: 2rem;
    transition: all 0.2s;

    &.disabled {
    background: #afafaf;
    opacity: 1;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }

`
export const ReflectButton = styled.button`
  font-size: 1rem;
  text-decoration: none;
  border: none;
  background-color: #12eba7;
  border-radius: 0.5rem;
  padding: 0.4rem 1.5rem;
  margin: 0 1rem;
  cursor: pointer;
  color: rgb(27, 25, 25);
  font-family: 'Baloo 2', cursive;
  box-shadow: 0 0 5px #12eba7, 0 0 20px #12eba7, 0 0 40px #12eba7,
    0 0 1000px #12eba7;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0 20px #12eba7, 0 0 65px #12eba7, 0 0 100px #12eba7,
      0 0 400px #12eba7;
  }
`

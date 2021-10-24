import React from 'react';
import styled from 'styled-components';
import { Icon } from '../SelectCurrencyCard.component';

interface RowInterface {
    name: string;
    setToken: (arg: string) => void;
}
 
const RowContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: rgba(0, 224, 196, 0.3);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    img {
      margin-left: 2rem;
    }

    p {
      margin-left: 1rem;
    }
`

export const Row: React.FunctionComponent<RowInterface> = ({ name, setToken }) => {

    const changeToken = () => {
        setToken(name);
    }
    
    return (
    <RowContainer onClick={changeToken}>
        <Icon src={`../images/${name}.png`} alt={ name } />
        <p> { name } </p>
    </RowContainer>
)};

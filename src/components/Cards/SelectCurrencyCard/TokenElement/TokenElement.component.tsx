import React, { FC } from 'react'
import { Icon } from '../SelectCurrencyCard.component';

interface ITokenElement {
    Component: React.ElementType;
    tokenName: string;
    setToken: (arg: string) => void;
}

export const TokenElement: FC<ITokenElement> = ({ Component, setToken, tokenName }) => {
    const changeToken = () => {
        setToken(tokenName);
    }
    
    return (
        <Component onClick={changeToken} >
            <Icon src={`../images/${tokenName}.png`} alt={ tokenName } />
            <p> { tokenName } </p>
        </Component>
    )
}
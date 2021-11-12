import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReflectButton } from '../Buttons/Buttons.component';

const Wrapper = styled.div`
    margin: 6rem 0 3rem 0;
    display: flex;
    align-items: center;
`

export const SwapLiquidityButtons: React.FunctionComponent = () => (
    <Wrapper> 
        <Link to='/'> <ReflectButton buttonWidth={7} margin='0 1rem'>SWAP</ReflectButton> </Link>
        <Link to='/liquidity'> <ReflectButton buttonWidth={7} margin='0 1rem'>LIQUIDITY</ReflectButton> </Link>
    </Wrapper>
)

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useWeb3Context  } from 'web3-react';
import { getChain } from '../../utils/networksDataHelper';
import { switchNetwork } from '../../utils/functionCallsHelper'; 

import { DefaultButton } from '../Buttons/Buttons.component';

const NavContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 3px solid white;
  // background-color: white;

  &::after {
    content: "";
    display: block;
    width: 100vw;
    position: absolute;
    background-color: #1affcd;
    height: 0.1rem;
    bottom: -0.15rem;
  }
`

const NavText = styled.h1`
    font-size: clamp(.7rem, 3vw, 1.4rem);
    margin-right: 1rem;
    color: white;
`

const AddressContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .3rem .8rem;
    border-radius: 1rem;
    background-color: transparent;
    border: 3px solid #1affcd;
    color: #15f0c0;
    margin-right: 2rem;
    font-size: clamp(.8rem, 3vw, 1.2rem);
`

const NotSupportedNetwork = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #f838386d;
    color: #f7f1f1dc;
    margin-right: 1rem;
`


export const PageHeader: React.FunctionComponent = () => {
    
    const [chain, setChain] = useState<string>('')
    const [userBalance, setUserBalance] = useState<number | null>(null)
    
    const context = useWeb3Context()
    console.log(context);
    const { active, networkId, account, library } = context

    const getUserBalance = async (): Promise<void> => {
        let balance: number = await library.eth.getBalance(account)
        balance = library.utils.fromWei(balance, 'ether')
        setUserBalance(balance)
    }

    useEffect(() => {
        if (active && networkId) {
            getUserBalance()
            setChain(getChain(networkId))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, account, networkId])

    return (
    <NavContainer>
        {
            networkId === 4 ?
            <>
                <NavText> {chain} </NavText>
                <NavText> {userBalance || '...'} ETH</NavText>
                <AddressContainer>
                    {
                    account ?
                    account.slice(0,4) + '...' + account.slice(-4)
                    :
                    '...'
                    }
                </AddressContainer>
            </>
            :
            
                <DefaultButton onClick={switchNetwork} margin='0 1rem 0 0' buttonWidth={10}> Change Network </DefaultButton>
            
        }
        
    </NavContainer>
)};

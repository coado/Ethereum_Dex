import React, { useRef, useState, useEffect } from 'react';
import { getAllTokens, getTokenAddress } from '../../utils/networksDataHelper'
import { useWeb3Context  } from 'web3-react';

import { Row } from './Row/Row.component';
import { Action, ActionTypes } from '../../hooks/useCardReducer/Actions';
import styled, { keyframes } from 'styled-components';


// STYLES

const Container = styled.div`
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
const Header = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;

    p {
      color: rgb(243, 243, 243);
      font-size: 1.4rem;
      font-weight: 600;
      letter-spacing: 0.05rem;
    }
`
const show = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const Card = styled.div`
  width: 26rem;
  height: 35rem;
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
const CloseSign = styled.span`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #00e0c4;
    cursor: pointer;
`
const Input = styled.input`
    width: 80%;
    border-radius: 1rem;
    padding: 1rem 0.5rem;
    background-color: rgba(255,255,255, 0.1);
    border: none;
    font-size: 1rem;
    color: #dfcece;

    &:focus {
      outline: none;
    }
    &::placeholder {
        text-align: center;
    }
`
const DefaultTokensText = styled.h1`
    font-size: 1.2rem;
    color: white;
    align-self: flex-start;
    align-self: center;
`
const DefaultTokensListContainer = styled.div`
    display: flex;
    align-items: center;
`
const DefaultTokensListElement = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: rgba(0, 224, 196, 0.8);
    }

    p {
      color: white;
      margin-left: 0.4rem;
    }
`
const AllTokensListContainer = styled.div`
    width: 100%;
    height: 70%;
    overflow-y: auto;
    margin-top: 1rem;
    // overflow: hidden;
    scrollbar-width: thin;
    scrollbar-color: #12eba7 rgba(255,255,255, 0.1);

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px #00e0c6c4;
         -webkit-box-shadow: inset 0 0 6px #00e0c6c4;
         border-radius: 1rem;
    }

    &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px #00e0c6c4;
        -webkit-box-shadow: inset 0 0 6px #00e0c4;
        border-radius: 1rem;
     }

`
export const Icon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`
////////////////////////////////////////////////////////////////////////////////

interface ISelectCurrencyCard {
    number: number;
    dispatch: (args: Action) => void;
}

export const SelectCurrencyCard: React.FunctionComponent<ISelectCurrencyCard> = ({ dispatch, number }) => {
    const context = useWeb3Context()
    const { networkId } = context

    let tokens: { [key: string]: string} = {};

    if (networkId) {
        tokens = getAllTokens(networkId)
    }    

    let cardRef = useRef<HTMLDivElement>(null)

    const [token, setToken] = useState('')
    

    useEffect(() => {
        if(token && networkId) {
            if (number === 1) {
                let tokenAddress = getTokenAddress(token, networkId)
                dispatch({
                    type: ActionTypes.SELECT_TOKEN1,
                    payload: { token, tokenAddress }
                })

            } else {
                let tokenAddress = getTokenAddress(token, networkId)
                dispatch({
                    type: ActionTypes.SELECT_TOKEN2,
                    payload: {token, tokenAddress }
                })   
            }
        }

  
    }, [token])


    const mouseClickHandling = (e: React.MouseEvent<HTMLDivElement>) => {
        let target: any = e.target

        if ( cardRef.current && !cardRef.current.contains(target)) {
            dispatch({
                type: ActionTypes.SET_CURRENCY_CARD,
                payload: {
                    show: false
                }
            })
        }
    }

    return (
        <Container onClick={mouseClickHandling}>
             <Card ref={cardRef}>
                <CloseSign onClick={() => dispatch({
                                        type: ActionTypes.SET_CURRENCY_CARD,
                                        payload: {
                                            show: false
                                        }
            })
            }> &#10006; </CloseSign>
                <Header>
                    <p>Select currency:</p>
                    <Input placeholder='type name or token address' />
                </Header>

                <DefaultTokensText> Default Tokens: </DefaultTokensText>
                
                <DefaultTokensListContainer> 
                    <DefaultTokensListElement>
                        <Icon src='../images/BUSD.png' alt='BUSD' /> 
                        <p> BUSD  </p>
                    </DefaultTokensListElement>
                    <DefaultTokensListElement>
                        <Icon src='../images/DAI.png' alt='DAI' /> 
                        <p> DAI  </p>
                    </DefaultTokensListElement>
                    <DefaultTokensListElement>
                        <Icon src='../images/GECKO.png' alt='GECKO' /> 
                        <p> GECKO  </p>
                    </DefaultTokensListElement>
                    <DefaultTokensListElement>
                        <Icon src='../images/BNB.png' alt='BNB' /> 
                        <p> BNB  </p>
                    </DefaultTokensListElement>
                </DefaultTokensListContainer>


                    <AllTokensListContainer>
                                {
                                    Object.keys(tokens).map((el, i) => <Row setToken={setToken} key={i} name={el} />)
                                }                        
                            
                    </AllTokensListContainer>
                
            </Card>
        </Container>
    )
}

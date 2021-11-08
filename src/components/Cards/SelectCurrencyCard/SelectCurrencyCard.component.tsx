import React, { useRef, useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useWeb3Context  } from 'web3-react';

import { getAllTokens, getTokenAddress } from '../../../utils/networksDataHelper'
import { Action, ActionTypes } from '../../../hooks/useCardReducer/Actions';

import { Container, Card, CloseSign } from '../ReusableCardStyles'; 
import { TokenElement } from './TokenElement/TokenElement.component';
// STYLES

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

const DefaultToken = styled.div`
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

const Token = styled.div`
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
    const [tokensList, setTokensList] = useState<string[]>([])
    const context = useWeb3Context()
    const { networkId } = context

    let allTokens = useRef<string[] | null>(null);
    useEffect(() => {
        if (networkId) {
            allTokens.current = Object.keys(getAllTokens(networkId))
            setTokensList(allTokens.current)
        }
    }, [networkId])    

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

    const filterList = (e: ChangeEvent<HTMLInputElement>) => {
        if (!allTokens.current) return
        const matches = allTokens.current.filter(el => el.toUpperCase().includes(e.target.value.toUpperCase()))
        setTokensList(matches)
    }

    return (
        <Container onClick={mouseClickHandling}>
             <Card width={26} height={35} ref={cardRef}>
                <CloseSign onClick={() => dispatch({
                                        type: ActionTypes.SET_CURRENCY_CARD,
                                        payload: {
                                            show: false
                                        }
            })
            }> &#10006; </CloseSign>
                <Header>
                    <p>Select currency:</p>
                    <Input onChange={e => filterList(e)} placeholder='type name or token address' autoCorrect='off' autoComplete='off' />
                </Header>

                <DefaultTokensText> Default Tokens: </DefaultTokensText>
                
                <DefaultTokensListContainer> 
                    {
                        ['DAI', 'WETH'].map((el, i) => <TokenElement Component={DefaultToken} setToken={setToken} key={i} tokenName={el} ></TokenElement>)
                    }
                </DefaultTokensListContainer>


                    <AllTokensListContainer>
                                {
                                    tokensList.map((el, i) => <TokenElement Component={Token} setToken={setToken} key={i} tokenName={el} />)
                                }                        
                            
                    </AllTokensListContainer>
                
            </Card>
        </Container>
    )
}

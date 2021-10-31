/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useWeb3Context  } from 'web3-react'
import { getAllTokens, getContractsAddresses } from '../utils/networksDataHelper';
import { getTokenData } from '../utils/functionCallsHelper';
import { Action, ActionTypes } from './useCardReducer/Actions';
import { Web3Context } from 'web3-react/dist/context';


export const useTokenData = (
    token1: string | null,
    token2: string | null,
    dispatch: React.Dispatch<Action>): void => {

    const context: Web3Context = useWeb3Context()
    const { account, library, active, networkId } = context

    let tokensList: { [key: string]: string } | null = null,
        contractAddresses: { [key: string]: string } | null = null; 

    if (networkId) {
        tokensList = getAllTokens(networkId);
        contractAddresses = getContractsAddresses(networkId)        
    }

    useEffect(() => {
        let token1Balance: number = 0, token2Balance: number = 0, token1Allowance: number, token2Allowance: number
        
        async function getBalance() {
            try {
        
                if (token1 && tokensList && tokensList[token1] && account) {
                    if (tokensList[token1] !== '' && contractAddresses) {

                        let data: {[key: string]: number} | undefined = await getTokenData(library, tokensList[token1], account, contractAddresses.Router)
                        if (data) {
                            token1Balance = data.tokenBalance
                            token1Allowance = data.allowance
                        }

                    } else {
                        token1Balance = 0
                    }
                }

                if ( token2 && tokensList && tokensList[token2] && account) {
                    if (tokensList[token2] !== '' && contractAddresses) {
                        let data: {[key: string]: number} | undefined = await getTokenData(library, tokensList[token2], account, contractAddresses.Router)

                        if (data) {
                            token2Balance = data.tokenBalance
                            token2Allowance = data.allowance
                        }
            
                        
                    } else {
                        token2Balance = 0
                    }
                }
                dispatch({
                    type: ActionTypes.SET_TOKENS_DATA,
                    payload: {
                        token1Balance: token1Balance ? library.utils.fromWei(token1Balance, 'ether') : token1Balance,
                        token2Balance: token2Balance ? library.utils.fromWei(token2Balance, 'ether') : token2Balance,
                        token1Allowance: token1Allowance ? library.utils.fromWei(token1Allowance, 'ether') : token1Allowance,
                        token2Allowance: token2Allowance ? library.utils.fromWei(token2Allowance, 'ether') : token2Allowance
                        
                    }
                })
                    
                
                
            } catch(error) {
                console.log(error);
            }
        }
        if (active) {

            getBalance()
        }

     
    }, [token1, token2])


}


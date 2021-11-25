import { useEffect } from 'react';
import { useWeb3Context  } from 'web3-react';
import { getAllTokens, getContractsAddresses } from '../utils/networksDataHelper';
import { getPairAddress } from '../utils/functionCallsHelper'; 
import { Action, ActionTypes } from './useCardReducer/Actions';

export const useGetPair = (
    token1: string | null,
    token2: string | null,
    dispatch: (arg: Action) => void
    ) => {

    const context = useWeb3Context()

    async function getPair() {
        try {
            const { library, networkId } = context
            if (!networkId || !token1 || !token2) return;
            const tokens = getAllTokens(networkId)
            const contracts = getContractsAddresses(networkId)
            // returning address
            return await getPairAddress(library, contracts.Factory, tokens[token1], tokens[token2])
                         
        } catch(error) {
            console.log(error);
            return null
        }
    }    

    useEffect(() => {
        if (token1 && token2) {
            getPair().then(address => {
                if (address === '0x0000000000000000000000000000000000000000') {
                    dispatch({
                        type: ActionTypes.SET_PAIR_ADDRESS,
                            payload: {
                                pair: {
                                    pairAddress: address,
                                    exist: false
                                },
                                alerts: {
                                    firstLiquidityProviderAlert: true,
                                    liquidityPoolAlert: false
                                }
                            }
                        })
                } 
                else if (address === null) {
                    dispatch({
                        type: ActionTypes.SET_PAIR_ADDRESS,
                            payload: {
                                pair: {
                                    pairAddress: address,
                                    exist: false
                                },
                                alerts: {
                                    firstLiquidityProviderAlert: false,
                                    liquidityPoolAlert: true
                                }
                            }
                        })
                } 
                else {
                    dispatch({
                        type: ActionTypes.SET_PAIR_ADDRESS,
                            payload: {
                                pair: {
                                    pairAddress: address,
                                    exist: true
                                },
                                alerts: {
                                    firstLiquidityProviderAlert: false,
                                    liquidityPoolAlert: false
                                }
                            }
                        })
                }
                
            })
        }


    }, [token1, token2])
}
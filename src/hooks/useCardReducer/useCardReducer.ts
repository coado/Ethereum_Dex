import React, { useReducer } from 'react'
import { ActionTypes, Action } from './Actions';

export interface State {
    token1: string | null;
    token2: string | null;
    token1Balance: number;
    token2Balance: number;
    token1Allowance: number;
    token2Allowance: number;
    token1Address: string | null;
    token2Address: string | null;
    pair: {
        pairAddress: string | null;
        exist: boolean;
    };   
    alerts: {[key: string]: boolean}; 
    currencyCard: { 
        show: boolean;
        number?: number;
     };
}

const initialState: State = {
    token1: null,
    token2: null,
    token1Balance: 0,
    token2Balance: 0,
    token1Allowance: 0,
    token2Allowance: 0,
    token1Address: null,
    token2Address: null,
    pair: {
        pairAddress: null,
        exist: false
    },
    alerts: {
        firstLiquidityProviderAlert: false,
        liquidityPoolAlert: false
    },
    currencyCard: {
        show: false,
    }
}  





function reducer(state: State, action: Action) {
    switch(action.type) {
        case ActionTypes.SELECT_TOKEN1:
            if (state.token2 === action.payload.token ) {
                return {
                    ...state,
                    token2: state.token1,
                    token1: action.payload.token,
                    token1Address: action.payload.tokenAddress,
                    currencyCard: {
                        show: false
                    }
                }
            } else {
                return {
                    ...state,
                    token1: action.payload.token,
                    token1Address: action.payload.tokenAddress,
                    currencyCard: {
                        show: false
                    }
                }
            }
        case ActionTypes.SELECT_TOKEN2:
            if (state.token1 === action.payload.token) {
                return {
                    ...state,
                    token1: state.token2,
                    token2: action.payload.token,
                    token2Address: action.payload.tokenAddress,
                    currencyCard: {
                        show: false
                    }
                }
            } else {
                return {
                    ...state,
                    token2: action.payload.token,
                    token2Address: action.payload.tokenAddress,
                    currencyCard: {
                        show: false
                    }
                }
            }
        case ActionTypes.SET_CURRENCY_CARD:
            return {    
                ...state,
                currencyCard: {
                    show: action.payload.show,
                    number: action.payload.number
                }
            }
        case ActionTypes.SET_TOKENS_DATA: 
            return {
                ...state,
                token1Balance: action.payload.token1Balance,
                token2Balance: action.payload.token2Balance,
                token1Allowance: action.payload.token1Allowance,
                token2Allowance: action.payload.token2Allowance
            }
        case ActionTypes.SET_PAIR_ADDRESS:
            return {
                ...state,
                pair: {
                    ...action.payload.pair
                },
                alerts: {
                    ...action.payload.alerts
                }
                
            }
        case ActionTypes.EXCHANGE_CURRENCIES:
            let cache = state.token1
            
            return {
                ...state,
                token1: state.token2,
                token2: cache
            }
        default: 
            return state
        }
    }
    const useCardReducer = (): [State, React.Dispatch<Action>] => {
        const [state, dispatch] = useReducer(reducer, initialState)
        return [state, dispatch]
    }

    export default useCardReducer;
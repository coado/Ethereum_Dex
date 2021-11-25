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
     settingsCard: boolean;
     settings: {
         slippage: number;
         deadline: number;
     }
     waitingCard: {
        show: boolean;
        transactionConfirmed: boolean;
        action: string;
        transactionHash: string;
     }
     errorMessage: string | null
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
    },
    settingsCard: false,
    settings: {
        slippage: 1,
        deadline: 20
    },
    waitingCard: {
        show: false,
        transactionConfirmed: false,
        action: '',
        transactionHash: ''
    },
    errorMessage: null
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
        case ActionTypes.SET_SETTINGS_CARD:
            return {
                ...state,
                settingsCard: action.payload
            }

        case ActionTypes.SET_SETTINGS:
            return {
                ...state,
                settings: {
                    slippage: action.payload.slippage,
                    deadline: action.payload.deadline
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
        case ActionTypes.SET_WAITING_CARD:
            return {
                ...state,
                waitingCard: {
                    show: action.payload.show,
                    action: action.payload.action,
                    transactionHash: action.payload.transactionHash,
                    transactionConfirmed: action.payload.transactionConfirmed
                }
            }
        case ActionTypes.SET_TRANSACTION_AS_CONFIRMED:
            return {
                ...state,
                waitingCard: {
                    ...state.waitingCard,
                    transactionConfirmed: true
                }
            }
        
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        
        case ActionTypes.EXCHANGE_CURRENCIES:
            let cacheToken = state.token1
            let cacheAddress = state.token1Address

            return {
                ...state,
                token1: state.token2,
                token2: cacheToken,
                token1Address: state.token2Address,
                token2Address: cacheAddress
            }
        default: 
            return state
        }
    }
    export const useCardReducer = (): [State, React.Dispatch<Action>] => {
        const [state, dispatch] = useReducer(reducer, initialState)
        return [state, dispatch]
    }
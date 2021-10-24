
export enum ActionTypes {
    SELECT_TOKEN1,
    SELECT_TOKEN2,
    SET_CURRENCY_CARD,
    SET_TOKENS_DATA,
    SET_PAIR_ADDRESS,
    EXCHANGE_CURRENCIES,
    TOKEN1_LIQUIDITY_FUNCTION
}

export interface SelectToken1 {
    type: ActionTypes.SELECT_TOKEN1;
    payload: {
        token: string;
        tokenAddress: string;
    };
}

export interface SelectToken2 {
    type: ActionTypes.SELECT_TOKEN2;
    payload: {
        token: string;
        tokenAddress: string;
    }
}

export interface SetCurrencyCard {
    type: ActionTypes.SET_CURRENCY_CARD;
    payload: { 
        show: boolean;
        number?: number;
    };
}

export interface SetTokensData {
    type: ActionTypes.SET_TOKENS_DATA;
    payload: { [key: string]: number};
}

export interface SetPairAddress {
    type: ActionTypes.SET_PAIR_ADDRESS;
    payload: {
        pair: {
            pairAddress: string;
            exist: boolean;
        }
        alerts: { [ key: string]: boolean};
    };
}

export interface ExchangeCurrencies {
    type: ActionTypes.EXCHANGE_CURRENCIES;
}

export type Action = SelectToken1 | SelectToken2 | SetCurrencyCard |  SetTokensData | SetPairAddress | ExchangeCurrencies;
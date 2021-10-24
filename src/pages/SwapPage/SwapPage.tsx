import React from 'react';
import useCardReducer from '../../hooks/useCardReducer/useCardReducer';
import useTokenData from '../../hooks/useTokenData';
import { useGetPair } from '../../hooks/useGetPair';
import { SwapLiquidityButtons } from '../../components/SwapLiquidityButtons/SwapLiquidityButtons.component';
import { SwapCard } from '../../components/SwapCard/SwapCard.component';
import { SelectCurrencyCard } from '../../components/SelectCurrencyCard/SelectCurrencyCard.component';

import { Page } from '../PageContainer/PageContainer';

const SwapPage: React.FunctionComponent = () => {

    const [state, dispatch] = useCardReducer()
    console.log(state);
    useTokenData(state.token1, state.token2, dispatch)
    useGetPair(state.token1, state.token2, dispatch)

    return (
    <Page>
        <SwapLiquidityButtons />
        <SwapCard token1={state.token1} token2={state.token2} token1Balance={state.token1Balance} token2Balance={state.token2Balance} dispatch={dispatch} />
        {
            state.currencyCard.show && state.currencyCard.number ?
            <SelectCurrencyCard dispatch={dispatch} number={state.currencyCard.number}  />
            :
            null
        }
    </Page>
)};

export default SwapPage;
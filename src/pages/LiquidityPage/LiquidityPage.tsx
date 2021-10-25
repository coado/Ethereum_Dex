import React from 'react';
import useCardReducer from '../../hooks/useCardReducer/useCardReducer';
import { SwapLiquidityButtons } from '../../components/SwapLiquidityButtons/SwapLiquidityButtons.component';
import { LiquidityCard } from '../../components/LiquidityCard/LiquidityCard.component';
import { SelectCurrencyCard } from '../../components/SelectCurrencyCard/SelectCurrencyCard.component';
import { SettingsCard } from '../../components/SettingsCard/SettingsCard.component';
import { Page } from '../PageContainer/PageContainer';


const LiquidityPage: React.FunctionComponent = () => {

    const [state, dispatch] = useCardReducer()
    console.log(state);

    return (

    <Page>
        <SwapLiquidityButtons />
        
        <LiquidityCard state={state} dispatch={dispatch} />
        {   
            state.settingsCard &&  <SettingsCard dispatch={dispatch} ></SettingsCard>
        }
        {
            state.currencyCard.show && state.currencyCard.number && <SelectCurrencyCard dispatch={dispatch} number={state.currencyCard.number}  />
        }
    </Page>
)}


export default LiquidityPage;

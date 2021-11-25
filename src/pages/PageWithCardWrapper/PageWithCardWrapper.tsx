import React, { useEffect } from 'react';
import styled from "styled-components"
// COMPONENTS
import { SwapLiquidityButtons } from '../../components/SwapLiquidityButtons/SwapLiquidityButtons.component';
import { SelectCurrencyCard } from '../../components/Cards/SelectCurrencyCard/SelectCurrencyCard.component';
import { SettingsCard } from '../../components/Cards/SettingsCard/SettingsCard.component';
import { WaitingCard } from '../../components/Cards/WaitingCard/WaitingCard.component';
import { ErrorLabel } from '../../components/ErrorLabel/ErrorLabel.component';
// HOOKS
import { useCardReducer } from '../../hooks/useCardReducer/useCardReducer';
// INTERFACES
import { Action, ActionTypes } from '../../hooks/useCardReducer/Actions';
import { State } from '../../hooks/useCardReducer/useCardReducer';

const PageContainer = styled.div`
width: 100%;
min-height: 100vh;
background-image: linear-gradient(
  to right top,
  #1e1923,
  #1b1426,
  #180f28,
  #13082c,
  #0c012f
);
display: flex;
flex-direction: column;
align-items: center;
font-family: 'Baloo 2', cursive;
overflow: hidden;
`

type Settings = {
  slippage: number;
  deadline: number;
}

export type ComponentProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  setWaitingCard: (transactionHash: string, action: string) => void;
  setTransactionAsConfirmed: () => void;
}

type Props = {
  Component: React.FunctionComponent<ComponentProps>
}


export const PageWithCardWrapper: React.FC<Props> = ({ Component }) => {
  const [state, dispatch] = useCardReducer()

  // getting settings data on mounting and passing to reducer
  useEffect(() => {
    const storageData = window.localStorage.getItem('settings')
    if (!storageData) return
    const settings: Settings = JSON.parse(storageData)

    dispatch({
        type: ActionTypes.SET_SETTINGS,
        payload: {
            ...settings
        }
    })        
  }, [])

  // Open Action Info Card
  const setWaitingCard = (transactionHash: string, action: string) => {
  dispatch({
    type: ActionTypes.SET_WAITING_CARD,
    payload: {
        show: true,
        action,
        transactionConfirmed: false,
        transactionHash
    }
  })
}
  // Setting Transaction as confirmed while action is performed
  // changing waiting card state
  const setTransactionAsConfirmed = () => {
    dispatch({
      type: ActionTypes.SET_TRANSACTION_AS_CONFIRMED,
  })
}
  return (
    <PageContainer>
      <SwapLiquidityButtons />
        <Component state={state} dispatch={dispatch} setWaitingCard={setWaitingCard} setTransactionAsConfirmed={setTransactionAsConfirmed} />
        {   
            state.settingsCard &&  <SettingsCard dispatch={dispatch} ></SettingsCard>
        }
        {
            state.currencyCard.show && state.currencyCard.number && <SelectCurrencyCard dispatch={dispatch} number={state.currencyCard.number}  />
        }
        {
            state.waitingCard.show && <WaitingCard data={state.waitingCard} dispatch={dispatch} />
        }
        {
          state.errorMessage && <ErrorLabel message={state.errorMessage} />
        }
    </PageContainer>
  )

  }


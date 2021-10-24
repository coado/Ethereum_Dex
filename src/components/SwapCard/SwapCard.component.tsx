import React, { useRef, useState } from 'react';
import { useWeb3Context  } from 'web3-react';
// COMPONENTS
import { Input } from '../Input/Input.component';
import { CardButton } from '../CardButton/CardButton.component';
import { Card,
        CardHeader,
        SettingsIconContainer,
        CurrencyWrapper,
        SelectedToken,
        ImageWrapper,
        Icon,
        Dash,
        SelectSign,
        ChangeTokens,
        Balance,
        Footer,
        ArrowSign,
        SettingsSign
    } from '../Card/Card.component';
// HOOKES
import { useButtonState } from '../../hooks/useButtonState';
// INTERFACE
import { Action, ActionTypes } from '../../hooks/useCardReducer/Actions';

interface SwapCardInterface {
    token1: string | null;
    token2: string | null;
    token1Balance: number;
    token2Balance: number;
    dispatch: (arg: Action) => void;
}

export const SwapCard: React.FunctionComponent<SwapCardInterface> = ({ token1, token2, token1Balance, token2Balance, dispatch}) => {

    const [inputToken1, setInputToken1] = useState('')
    const inputToken2 = useRef<HTMLInputElement>(null);
    
    const context = useWeb3Context()
    // const { active } = context

    // const buttonText = useButtonText(token1, token2, inputToken1, null, token1Balance, null)

    const handleConnectWallet = () => {
        context.setConnector('MetaMask')
    }
    
    return (
    <Card>
        <CardHeader>

            <h1> Swap Tokens </h1>

            <SettingsIconContainer>
                <SettingsSign />
            </SettingsIconContainer>
        </CardHeader>
        <CurrencyWrapper>
            <Input setInput={setInputToken1} ref={inputToken2} />
            <SelectedToken onClick={() => dispatch({type: ActionTypes.SET_CURRENCY_CARD, payload: {show: true, number: 1}})}>
                {
                    token1 ?
                    <ImageWrapper>
                        <h2> {token1} </h2>
                        <Icon src={`../images/${token1}.png`} alt={ token1 } />
                    </ImageWrapper>
                    : 
                    <Dash>&#8213;</Dash>
                }
                
                <SelectSign>&#10095;</SelectSign>
            </SelectedToken>
        </CurrencyWrapper>

        <Balance>
                <span onClick={() => {
                    if (!inputToken2.current) return
                    inputToken2.current.value = String(token1Balance)
                    setInputToken1(String(token1Balance))
                    }}> MAX </span>
                <p>Balance: {token1Balance} </p> 
        </Balance>

        <ChangeTokens onClick={() => dispatch({type: ActionTypes.EXCHANGE_CURRENCIES})}>
            <ArrowSign className='left' rotate={90} />
            <ArrowSign className='rigth' rotate={-90} />
        </ChangeTokens>

        <CurrencyWrapper>
            <Input disabled={true} />
            <SelectedToken onClick={() => dispatch({type: ActionTypes.SET_CURRENCY_CARD, payload: {show: true, number: 2}})}>
                {
                    token2 ?
                    <ImageWrapper>
                        <h2> {token2} </h2>
                        <Icon src={`../images/${token2}.png`} alt={ token2 } />
                    </ImageWrapper>
                    : 
                    <Dash>&#8213;</Dash>
                }
            <SelectSign>&#10095;</SelectSign>
            </SelectedToken>
        </CurrencyWrapper>

        <Balance>
            <p>Balance: {token2Balance} </p> 
        </Balance>

        <Footer>
            {
                // active ?
                // <CardButton text={buttonText} />
                // :
                <CardButton onClick={handleConnectWallet} text='Connect wallet' />
            }
        </Footer>
    </Card>
)};

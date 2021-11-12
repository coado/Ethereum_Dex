import React, { useRef, useState, useEffect } from 'react';
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
        PoolStats,
        ChangeTokens,
        Balance,
        Footer,
        ArrowSign,
        SettingsSign,
        Text
    } from '../Cards/MainCard/MainCard.styles';
// HOOKS
import { useTokenData } from '../../hooks/useTokenData';
import { useGetPair } from '../../hooks/useGetPair';
import { useButtonState } from '../../hooks/useButtonState';
import { useReserves } from '../../hooks/useReserves';
// UTILS
import { getContractsAddresses } from '../../utils/networksDataHelper'
import { approve, swapTokens } from '../../utils/functionCallsHelper';
import { MaxUint256 } from '../../MaxUint256';
// INTERFACES
import { ActionTypes } from '../../hooks/useCardReducer/Actions';
import { ComponentProps } from '../../pages/PageWithCardWrapper/PageWithCardWrapper'


export const SwapCard: React.FunctionComponent<ComponentProps> = (
    {
        state: {
            token1, 
            token2, 
            token1Balance, 
            token2Balance,
            token1Allowance,
            token1Address,
            token2Address,
            pair,
            settings
        },
        dispatch,
        setWaitingCard,
        setTransactionAsConfirmed
    }
     ) => {
    const context = useWeb3Context()
    const { active, library, account, networkId } = context
       
        
    const [inputToken1, setInputToken1] = useState('')
    const inputToken2 = useRef<HTMLInputElement>(null);
    
    useTokenData(token1, token2, dispatch)
    useGetPair(token1, token2, dispatch)
    const reserves = useReserves(pair.pairAddress, pair.exist, token1Address, library)
    const buttonState = useButtonState(token1, token2, inputToken1, inputToken2.current?.value, token1Balance, token2Balance, settings.slippage, reserves)
        
    useEffect(() => {
        if (inputToken2.current && reserves && pair.exist) {
            // algorithm for calculating dy - token2 price
            inputToken2.current.value = String( Math.round(((reserves.reserve1*Number(inputToken1)) / (reserves.reserve0 + Number(inputToken1)))*100)/100 )
        } 
    }, [inputToken1])

    const handleConnectWallet = () => {
        context.setConnector('MetaMask')
    }

    const callApprove = async (tokenAddress: string | null) => {
        try {
            if (!networkId || !account || !tokenAddress) return;
            const contracts = getContractsAddresses(networkId)
            await approve(
                library, 
                tokenAddress, 
                contracts.Router, 
                library.utils.fromWei(MaxUint256, 'ether'), 
                account,
                setWaitingCard,
                setTransactionAsConfirmed
            )
        } catch(error) {
            console.error(error)
        }
    }

    const callSwapTokens = async () => {
        try {
            if (!networkId || !inputToken2.current || !token1Address || !token2Address || !account) return
            if (settings.slippage >= 100) throw Error
            const contracts = getContractsAddresses(networkId)
            const minAmountsIn = String((Math.round((Number(inputToken2.current.value) * ((100-settings.slippage)/100))*1000))/1000)
            const deadline = Date.now()+(settings.deadline*60*1000)
            // Calling swapTokens function
            await swapTokens(
                library, 
                contracts.Router, 
                inputToken1, 
                minAmountsIn, 
                [token1Address, token2Address], 
                account, 
                deadline,
                setWaitingCard,
                setTransactionAsConfirmed
            )  
        
        } catch (error) {
            console.error(error)
        }
        }
    
    return (
    <Card>
        <CardHeader>

            <h1> Swap Tokens </h1>

            <SettingsIconContainer  backgroundColor={settings.slippage >= 50 ? '#f7287b' : null} 
                onClick={() => dispatch({
                    type: ActionTypes.SET_SETTINGS_CARD,
                    payload: true
                })}>
                <SettingsSign />
            </SettingsIconContainer>
        </CardHeader>
        <CurrencyWrapper>
            <Input setInput={setInputToken1} value={inputToken1} />
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
                    setInputToken1(String(token1Balance))
                    }}> MAX </span>
                <p>Balance: { (Math.round(token1Balance*100)) / 100 } </p> 
        </Balance>

        <ChangeTokens onClick={() => dispatch({type: ActionTypes.EXCHANGE_CURRENCIES})}>
            <ArrowSign className='left' rotate={90} />
            <ArrowSign className='rigth' rotate={-90} />
        </ChangeTokens>

        <CurrencyWrapper>
            <Input disabled={true} ref={inputToken2} />
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
            <p>Balance: { (Math.round(token2Balance*100)) / 100 } </p> 
        </Balance>

        {
            reserves && inputToken2.current &&
            <>
                <PoolStats>
                    <div>
                        <h2> Minimum Received</h2>
                        <h2> {(Math.round((Number(inputToken2.current.value) * ((100-settings.slippage)/100))*1000))/1000} Token </h2>
                    </div>
                    <div>
                        <h2> Slippage Tolerance </h2>
                        <h2> {settings.slippage}% </h2>
                    </div>
                    <div>
                        <h2>Price Impact</h2>
                        <h2> {(Math.round((Number(inputToken2.current.value) / reserves.reserve1)*10000))/100}%</h2>
                    </div>
                </PoolStats>
                <Text margin= '0' fontSize={0.8}>Price: &nbsp; 
                    { inputToken1 !== '' ? 
                                (Math.round((Number(inputToken1) / Number(inputToken2.current.value))*1000))/1000 
                                : (Math.round((reserves.reserve0 / reserves.reserve1)*1000))/1000
                    }
                    &nbsp; {token1} &nbsp; per &nbsp; {token2} </Text>
            </>
        }

        <Footer>
            {
                active ?
                <CardButton margin='0 0 2rem 0' text= { 
                    buttonState.disabled === false && token1Allowance < Number(inputToken1) 
                    ? 'Approve'
                    : buttonState.text
                
                } disabled={buttonState.disabled} onClick={() => {
                    if (token1Allowance < Number(inputToken1)) {
                        // nested if to preventing calling else if token1Address does not exist
                        if (!token1Address) return
                        callApprove(token1Address)
                    } else {
                        callSwapTokens()
                    }
                }}  />
                :
                <CardButton margin='0 0 2rem 0' onClick={handleConnectWallet} text='Connect wallet' />
            }
        </Footer>
    </Card>
)};

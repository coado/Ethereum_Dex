import React, { useRef, useEffect, useState } from 'react';
import { useWeb3Context  } from 'web3-react';
// COMPONENTS
import { Input } from '../Input/Input.component';
import { CardButton } from '../CardButton/CardButton.component';
import { Card,
        CardHeader,
        SettingsIconContainer,
        SettingsSign,
        CurrencyWrapper,
        SelectedToken,
        Alert,
        ImageWrapper,
        Icon,
        Dash,
        SelectSign,
        Balance,
        AddSign,
        PoolStats,
        ApproveWrapper,
        ApproveText,
        ApproveButtons,
        Footer } from '../Card/Card.component';

// HOOKS
import useTokenData from '../../hooks/useTokenData';
import { useGetPair } from '../../hooks/useGetPair';
import { useButtonState } from '../../hooks/useButtonState';
import { useReserves } from '../../hooks/useReserves';
// UTILS
import { MaxUint256 } from '../../MaxUint256';
import { getTokenAddress, getContractsAddresses } from '../../utils/networksDataHelper'
import { approve, addLiquidity } from '../../utils/functionCallsHelper';
// INTERFACE
import { State } from '../../hooks/useCardReducer/useCardReducer';
import { ActionTypes, Action } from '../../hooks/useCardReducer/Actions';

interface LiquidityCardInterface {
    state: State,
    dispatch: (arg: Action) => void;
}

export const LiquidityCard: React.FunctionComponent<LiquidityCardInterface> = (
    { 
        state: {
            token1, 
            token2, 
            token1Balance, 
            token2Balance, 
            token1Allowance, 
            token1Address,
            token2Address, 
            token2Allowance, 
            pair, 
            alerts
        }, 
        dispatch }
    ) => {

    const context = useWeb3Context()
    const { active, library, account, networkId } = context

    const [inputToken1, setInputToken1] = useState('')  
    const inputToken2 = useRef<HTMLInputElement>(null)
    
    
    useTokenData(token1, token2, dispatch)
    useGetPair(token1, token2, dispatch)
    const buttonState = useButtonState(token1, token2, inputToken1, inputToken2.current?.value, token1Balance, token2Balance)
    const reserves= useReserves(pair.pairAddress, pair.exist, token1Address, library)

    useEffect(() => {
        if (inputToken2.current && reserves && pair.exist) {
            inputToken2.current.value = String( (reserves.reserve1 / reserves.reserve0) * Number(inputToken1))
        } 
    }, [inputToken1])

    const handleConnectWallet = () => {
        context.setConnector('MetaMask')
    }

    const callApprove = async (tokenAddress: string) => {
        if (!networkId || !account) return;
        const contracts = getContractsAddresses(networkId)
        await approve(library, tokenAddress, contracts.Router, library.utils.fromWei(MaxUint256, 'ether'), account)
    }

    const callAddLiquidity = async () => {
        try {
            let routerAddress: string;
            if (!networkId || !token1Address || !token2Address || !inputToken2.current || !account) return

            type Settings = {
                slippage: number;
                deadline: number;
            }

            let token1MinAmount: string = "1"
            let token2MinAmount: string = "1"
            let deadline = Date.now()+(20*60*1000)

            const storageData = window.localStorage.getItem('settings');
            let settings: Settings
            if (storageData) {
                settings = JSON.parse(storageData)                
                token1MinAmount = String(Number(inputToken1)-Number(inputToken1)*(settings.slippage / 100)) 
                token2MinAmount = String(Number(inputToken2.current.value)-Number(inputToken2.current.value)*(settings.slippage / 100)) 
                deadline = Date.now()+(settings.deadline*60*1000)
            }
            console.log(token1MinAmount, token2MinAmount, deadline);
            
        
            const contracts = getContractsAddresses(networkId)
            routerAddress = contracts.Router

            await addLiquidity(
                library, 
                routerAddress, 
                token1Address, 
                token2Address,
                inputToken1,
                inputToken2.current.value,
                token1MinAmount,
                token2MinAmount,
                account,
                deadline
            )
        } catch(error) {
            console.error(error)
        }
        
    }


    return (
    <Card  >
        <CardHeader>

                <h1> Add Liquidity </h1>

                <SettingsIconContainer onClick={() => dispatch({
                    type: ActionTypes.SET_SETTINGS_CARD,
                    payload: true
                })}>
                    <SettingsSign />
                </SettingsIconContainer>
        </CardHeader>
            {   
                alerts.firstLiquidityProviderAlert ?
                <Alert>
                        <h1> You are the first liquidity provider! </h1>
                        <p> The ratio of tokens you add will set the price of this pool.
                        Once you are happy with the rate click supply to review. </p>
                </Alert>
                : 
                null
            }

            {   
                alerts.liquidityPoolAlert ?
                <Alert>
                        <h1> There is problem with provided pool </h1>
                        <p> We cannot perform your request due to encounter problem. 
                            Please contact with support or try again later.
                        </p>
                </Alert>
                : 
                null
            }
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
                        setInputToken1(String(token1Balance))
                    }} > MAX </span>
                    <p>Balance: { token1Balance } </p> 
            </Balance>

            <AddSign>
                <span> + </span>
            </AddSign>

            <CurrencyWrapper>
                <Input ref={inputToken2} disabled={pair.exist ? true : false} />
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
                    <p>Balance: { token2Balance } </p> 
            </Balance>   
            {
                reserves &&
                <PoolStats>
                    <div>
                        <h2>{token1} PER {token2}</h2>
                        <h2>{ (reserves.reserve0 / reserves.reserve1 )}</h2>
                    </div>

                    <div>
                        <h2>{token2} PER {token1}</h2>
                        <h2>{(reserves.reserve1 / reserves.reserve0)}</h2>
                    </div>

                    <div>
                        <h2>SHARE OF POOL</h2>
                        <h2>{(Math.round((Number(inputToken1) / (reserves.reserve0 + Number(inputToken1)))*10000)) / 100}%</h2>
                    </div>

                </PoolStats>
            }
            {
                token1 && token2 ?
                <ApproveButtons>
                        <ApproveWrapper>
                            <ApproveText>Approve</ApproveText>
                            <CardButton buttonWidth={75} disabled={token1Allowance > Number(inputToken1)} onClick={() => {
                                if (!networkId) return
                                callApprove(getTokenAddress(token1, networkId))
                            }} text={token1} />
                        </ApproveWrapper>
                            
                        <ApproveWrapper>
                            <ApproveText>Approve</ApproveText>
                            <CardButton buttonWidth={75} disabled={ token2Allowance > Number(inputToken2.current ? inputToken2.current.value : 0) } onClick={() => {
                                if (!networkId) return
                                callApprove(getTokenAddress(token2, networkId))
                            }} text={token2} />
                        </ApproveWrapper>
                </ApproveButtons>
                :
                null
            }

        <Footer>
            {
                active ?
                <CardButton onClick={callAddLiquidity} text={buttonState.text} disabled={buttonState.disabled}  />
                :
                <CardButton onClick={handleConnectWallet} text='Connect wallet' />
            }
        </Footer>

    </Card>
)}


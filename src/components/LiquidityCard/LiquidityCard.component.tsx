import React, { useRef, useEffect, useState, ReactElement } from 'react';
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
        Text,
        Footer } from '../Card/Card.component';

// HOOKS
import { useTokenData } from '../../hooks/useTokenData';
import { useGetPair } from '../../hooks/useGetPair';
import { useButtonState } from '../../hooks/useButtonState';
import { useReserves } from '../../hooks/useReserves';
// UTILS
import { MaxUint256 } from '../../MaxUint256';
import { getContractsAddresses } from '../../utils/networksDataHelper'
import { approve, addLiquidity } from '../../utils/functionCallsHelper';
// INTERFACES
import { State } from '../../hooks/useCardReducer/useCardReducer';
import { ActionTypes, Action } from '../../hooks/useCardReducer/Actions';

interface LiquidityCardInterface {
    state: State,
    dispatch: React.Dispatch<Action>;
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
            alerts,
            settings
        }, 
        dispatch }
    ) => {

    const context = useWeb3Context()
    const { active, library, account, networkId } = context

    const [inputToken1, setInputToken1] = useState('')  
    const inputToken2 = useRef<HTMLInputElement>(null)
    const [transactionHash, setTransactionHash] = useState<null | string>(null)
    
    useTokenData(token1, token2, dispatch)
    useGetPair(token1, token2, dispatch)
    const {button: buttonState} = useButtonState(token1, token2, inputToken1, inputToken2.current?.value, token1Balance, token2Balance)
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
            if (!networkId || !token1Address || !token2Address || !inputToken2.current || !account) return
            if (settings.slippage >= 100) throw Error
            const token1MinAmount = String(Number(inputToken1)-Number(inputToken1)*(settings.slippage / 100)) 
            const token2MinAmount = String(Number(inputToken2.current.value)-Number(inputToken2.current.value)*(settings.slippage / 100)) 
            const deadline = Date.now()+(settings.deadline*60*1000) 
            const contracts = getContractsAddresses(networkId)

            await addLiquidity(
                library, 
                contracts.Router, 
                token1Address, 
                token2Address,
                inputToken1,
                inputToken2.current.value,
                token1MinAmount,
                token2MinAmount,
                account,
                deadline,
                setTransactionHash
            )
        } catch(error) {
            console.error(error)
        }
        
    }


    return (
    <Card  >
        <CardHeader>

                <h1> Add Liquidity </h1>

                <SettingsIconContainer backgroundColor={settings.slippage >= 50 ? '#f7287b' : null} onClick={() => dispatch({
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
                    <p>Balance: { (Math.round(token1Balance*100)) / 100 } </p> 
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
                    <p>Balance: { (Math.round(token2Balance*100)) / 100 } </p> 
            </Balance>   
            {
                reserves &&
                <PoolStats>
                    <div>
                        <h2>{token1} PER {token2}</h2>
                        <h2>{ (Math.round((reserves.reserve0 / reserves.reserve1)*1000)) / 1000}</h2>
                    </div>

                    <div>
                        <h2>{token2} PER {token1}</h2>
                        <h2>{ (Math.round((reserves.reserve1 / reserves.reserve0)*1000)) / 1000 }</h2>
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
                                if (!networkId || !token1Address) return
                                callApprove(token1Address)
                            }} text={token1} />
                        </ApproveWrapper>
                            
                        <ApproveWrapper>
                            <ApproveText>Approve</ApproveText>
                            <CardButton buttonWidth={75} disabled={ token2Allowance > Number(inputToken2.current ? inputToken2.current.value : 0) } onClick={() => {
                                if (!networkId || !token2Address) return
                                callApprove(token2Address)
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
        {
            transactionHash && 
            <Text fontSize={0.8} margin='-1rem 0 1rem 0'> Transaction Hash: <a href={`https://rinkeby.etherscan.io/tx/${transactionHash}`}> {`${transactionHash.slice(0, 4)}...${transactionHash.slice(-4)}`} </a></Text>    
        }

    </Card>
)}


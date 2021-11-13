import { useRef } from 'react'; 
import styled, { keyframes } from 'styled-components'
import { Action, ActionTypes } from '../../../hooks/useCardReducer/Actions'

import { ReflectButton } from '../../Buttons/Buttons.component';
import { Container, Card, CloseSign, Text } from '../ReusableCardStyles'

const spinnerAnimation = keyframes`
    0% {
        transform: translateX(-3rem) ;
        width: 3rem;
        box-shadow: -40px 0px 7px #12eba7, 1px 0px 6px #fff;
    }

    25% {
        width: 2.5rem;
        box-shadow: -30px 0px 7px #12eba7, 1px 0px 6px #fff;
    }

    50% {
        width: 2rem;
        box-shadow: -20px 0px 7px #12eba7, 1px 0px 6px #fff;
    }

    100% {
        transform: translateX(14rem);
        box-shadow: -10px 0px 7px #12eba7, 1px 0px 6px #fff;
    }
`

const Spinner = styled.div`
    width: 12rem;
    height: 1rem;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;

    span {
        width: 2rem;
        height: .2rem;
        background-color: #12eba7;
        transition: all .2s;
        border-radius: 2px;
        transform: translateX(2rem);
        animation: ${spinnerAnimation} .6s .2s infinite;
    }
    
`

interface IWaitingCard {
    data: {
        show: boolean;
        action: string;
        transactionHash: string;
        transactionConfirmed: boolean;
    };
    dispatch: (args: Action) => void;
}

export const WaitingCard: React.FC<IWaitingCard> = ({ data, dispatch }) => {
    let cardRef = useRef<HTMLDivElement>(null)

    const mouseClickHandling = (e: React.MouseEvent<HTMLDivElement>) => {
        let target: any = e.target

        if ( cardRef.current && !cardRef.current.contains(target)) {
            closeHandling()
        }
    }

    const closeHandling = () => {
        dispatch({
            type: ActionTypes.SET_WAITING_CARD,
            payload: {
                show: false,
                action: '',
                transactionHash: '',
                transactionConfirmed: false
            }
        })
    }

    return (
        <Container onClick={mouseClickHandling} >
            <Card ref={cardRef} width={32} height={18}>
                <CloseSign onClick={closeHandling}> &#10006; </CloseSign>
                <Text margin='1.2rem 0 0 0' letterSpacing={0.1} fontSize={1.5} > {data.action}...</Text>
                {
                    data.transactionConfirmed ?
                    <Text margin='1rem 0 0 0' fontSize={1.3}> Succed! </Text>
                    : <Spinner><span></span></Spinner>
                }
                <Text margin='1rem 0 0 0' fontSize={1.3}>Transaction Hash:</Text>
                <Text fontSize={0.8}> {data.transactionHash} </Text>

                <ReflectButton buttonWidth={15} margin='2.5rem 0' ><a rel="noreferrer" target='_blank' href={`https://rinkeby.etherscan.io/tx/${data.transactionHash}`}>View on etherscan</a></ReflectButton>
            </Card>
        </Container>
    )
}
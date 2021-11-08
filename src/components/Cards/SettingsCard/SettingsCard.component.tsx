import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

import { ActionTypes, Action } from '../../../hooks/useCardReducer/Actions';
import { filterInputText } from '../../../utils/filterInputText';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

import { SlippageButton } from '../../Buttons/Buttons.component'; 
import { Container, Card, CloseSign, Text } from '../ReusableCardStyles';

interface IWrapper {
    direction?: string;
    widthInPercent?: number;
    justify?: string;
    margin?: string;
    align?: string;
}

const Wrapper = styled.div<IWrapper>`
    display: flex;
    align-items: ${props => props.align || 'center'};
    flex-direction: ${props => props.direction};
    width: ${props => `${props.widthInPercent}%`};
    justify-content: ${props => props.justify};
    margin: ${props => props.margin};
    position: relative;
`

interface IInput {
    borderColor?: string | null;
}

const Input = styled.input<IInput>`
        width: 2.5rem;
        background-color: transparent;
        border: ${props => props.borderColor ? `2px solid ${props.borderColor}` : '2px solid #12eba7'};
        border-radius: 1rem;
        padding: 0.4rem 0.4rem;
        font-size: 1rem;
        -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
        color: #12eba7;
        transition: all .2s;

          &:focus {
            outline: none;
        }
`

interface ISettingsCard {
    dispatch: (args: Action) => void;
}

export const SettingsCard: React.FunctionComponent<ISettingsCard> = ({ dispatch }) => {
    const [storedValue, setValue] = useLocalStorage('settings', {slippage: 0.5, deadline: 20})

    const [ slippage, setSlippage ] = useState(storedValue.slippage)
    const [ deadline, setDeadline ] = useState(storedValue.deadline)
    const [ slippageAlert, setSlippageAlert ] = useState('')

    useEffect(() => {
        if (slippage <= 0) setSlippageAlert('Your transaction may fail!')
        else if (slippage >= 50) setSlippageAlert('Slippage tolerance value is too high!')
        else if (slippage >= 5) setSlippageAlert('Your transaction may be frontrun!')
        else setSlippageAlert('')
        
    }, [slippage])

    let cardRef = useRef<HTMLDivElement>(null)

    
    const mouseClickHandling = (e: React.MouseEvent<HTMLDivElement>) => {
        let target: any = e.target

        if ( cardRef.current && !cardRef.current.contains(target)) {
            closeHandling()
        }
    }

    const closeHandling = () => {
        // saving data in local storage
        setValue({
            slippage,
            deadline
        })
        // passing data to reducer
        dispatch({
            type: ActionTypes.SET_SETTINGS,
            payload: {
                slippage,
                deadline
            }
        })
        // closing card
            dispatch({
            type: ActionTypes.SET_SETTINGS_CARD,
            payload: false
        })
    }
    
    return (
    <Container onClick={mouseClickHandling} >
        <Card width={30} height={16} ref={cardRef} >
            <Text fontSize={1.5}  letterSpacing={0.3} margin='1rem 0 0 0' >SETTINGS</Text>
            <CloseSign onClick={closeHandling}> &#10006; </CloseSign>
            <Wrapper widthInPercent={100} margin='2rem 0 0 0' >
                <Wrapper direction='column' widthInPercent={70} justify='center' margin='0 0 0 2rem'>
                    <Text margin='0 0 1.5rem 0'>Slippage Tolerance</Text>
                    <Wrapper widthInPercent={100} justify='space-around'>
                        <SlippageButton onClick={() => setSlippage(0.1)} backgroundColor={slippage === 0.1 ? '#12eba7' : null} >0.1%</SlippageButton>
                        <SlippageButton onClick={() => setSlippage(0.5)} backgroundColor={slippage === 0.5 ? '#12eba7' : null} >0.5%</SlippageButton>
                        <SlippageButton onClick={() => setSlippage(1)} backgroundColor={slippage === 1 ? '#12eba7' : null} >1.00%</SlippageButton>

                        <Wrapper>
                            <Input borderColor={slippage >= 50 ? '#F22323' : null} value={slippage} onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => filterInputText(e)} maxLength={4} placeholder={String(slippage)} onChange={e => setSlippage(Number(e.target.value))} autoComplete='off' autoCorrect='off' ></Input>
                            <Text>&nbsp;%</Text>
                        </Wrapper>
                    </Wrapper>    
                </Wrapper>  

                <Wrapper direction='column' widthInPercent={50} justify='center'>
                    <Text margin='0 0 1.5rem 0'>Deadline</Text>
                    <Wrapper>
                        <Input onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => filterInputText(e)} value={deadline} maxLength={4} placeholder={String(deadline)} onChange={e => setDeadline(Number(e.target.value))} autoComplete='off' autoCorrect='off' ></Input>
                        <Text>&nbsp;Min</Text>
                    </Wrapper>
                </Wrapper> 
            </Wrapper> 
            <Wrapper widthInPercent={100} direction='column' align='flex-start' >
                <Text margin='1rem 0 0 2rem' fontSize={0.8}> {slippageAlert}  </Text>                
            </Wrapper>
        </Card>
    </Container>
)}

import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { SlippageButton } from '../Buttons/Buttons.component'; 
import { ActionTypes, Action } from '../../hooks/useCardReducer/Actions';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { filterInputText } from '../../utils/filterInputText';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-backdrop-filter: blur(0.3rem);
    backdrop-filter: blur(0.3rem);
    z-index: 1000;
    position: fixed;
    top: 1rem;
`

const show = keyframes`

    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

const Card = styled.div`
  width: 30rem;
  height: 16rem;
  position: fixed;
  background-color: #1b1426;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  animation: ${show} 0.3s cubic-bezier(0.05, 0.2, 0.9, 1) forwards;
  position: relative;
  border: 1px solid #00e0c4;
  transition: all 0.2s;
`
interface IWrapper {
    direction?: string;
    widthInPercent?: number;
    justify?: string;
    margin?: string;
}

const Wrapper = styled.div<IWrapper>`
    display: flex;
    align-items: center;
    flex-direction: ${props => props.direction};
    width: ${props => `${props.widthInPercent}%`};
    justify-content: ${props => props.justify};
    margin: ${props => props.margin};
    position: relative;
`

const CloseSign = styled.span`
    position: absolute;
    top: 1rem;
    right: 1rem;
    color: #00e0c4;
    cursor: pointer;
`

interface IText {
    margin?: string;
    fontSize?: number;
    letterSpacing?: number;
}

const Text = styled.h1<IText>`
    font-size: ${props => props.fontSize ? `${props.fontSize}rem` : '1rem'};
    color: #12eba7;
    margin: ${props => props.margin};
    letter-spacing: ${props => `${props.letterSpacing}rem`};
`

const Input = styled.input`
        width: 2.5rem;
        background-color: transparent;
        border: 2px solid #12eba7;
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

    let cardRef = useRef<HTMLDivElement>(null)

    
    const mouseClickHandling = (e: React.MouseEvent<HTMLDivElement>) => {
        let target: any = e.target

        if ( cardRef.current && !cardRef.current.contains(target)) {
            closeHandling()
        }
    }

    const closeHandling = () => {
        setValue({
            slippage,
            deadline
        })
        dispatch({
            type: ActionTypes.SET_SETTINGS_CARD,
            payload: false
        })
    }
    
    return (
    <Container onClick={mouseClickHandling} >
        <Card ref={cardRef} >
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
                            <Input onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => filterInputText(e)} maxLength={4} placeholder={String(slippage)} onChange={e => setSlippage(Number(e.target.value))} autoComplete='off' autoCorrect='off' ></Input>
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
        </Card>
    </Container>
)}

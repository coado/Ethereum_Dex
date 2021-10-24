import React from 'react';
import styled from 'styled-components';

interface Props {
    disabled?: boolean;
    setInput?: (value: string) => void;
    value?: string;
}

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InputValue = styled.input`
        width: 80%;
        border-radius: .5rem;
        padding: 1.4rem 1rem;
        background-color: transparent;
        border: none;
        color: white;
        font-family: 'Baloo 2', cursive;
        font-size: 1.5rem;

        &::placeholder {
            color: white;
        }

        &:focus {
            outline: none;
        }
`


export const Input = React.forwardRef<HTMLInputElement, Props>(( { disabled, setInput, value }, ref ) => {
    
    const filterInputText = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
        if (!/^[0-9]*[.,]?[0-9]*$/.test(e.key) || (e.target as HTMLInputElement).value.length > 80) {
            e.preventDefault();
        }
        
    }
    
    return (
        <InputContainer>
            <InputValue value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput ? setInput(e.target.value) : null} disabled={disabled} ref={ref} spellCheck='false' onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => filterInputText(e)} placeholder='0.0' required type='text' pattern='^[0-9]*[.,]?[0-9]*$' autoComplete='off' inputMode='decimal' autoCorrect='off' />
        </InputContainer>
)});

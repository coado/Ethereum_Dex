import { useEffect, useState } from 'react'
import { Reserves } from './useReserves';

export const useButtonState = (
    token1: string | null,
    token2: string | null,
    inputTokenValue1: string | null,
    inputTokenValue2: string | null | undefined,
    tokenBalance1: number | null,
    tokenBalance2: number | null,
    reserves?: Reserves | null
    ) => {
    const [button, setButton] = useState({
        text: 'Provide Value',
        disabled: true
    })

    const setButtonState = (text: string, disabled: boolean): void =>  {
        setButton({ text, disabled })
    }   

    useEffect(() => {               
        if (!token1 || !token2) setButtonState('Select token', true)
        else if (reserves === null) setButtonState('Insufficient Liquidity', true)
        else if (!inputTokenValue1 || inputTokenValue1 === '0') setButtonState('Provide Value', true)
        else if (tokenBalance1 !== null && Number(inputTokenValue1) > tokenBalance1) setButtonState(`Insufficient ${token1} balance`, true)
        else if (tokenBalance2 !== null && Number(inputTokenValue2) > tokenBalance2) setButtonState(`Insufficient ${token2} balance`, true)
        else setButtonState('Submit', false)

    }, [token1, token2, inputTokenValue1, inputTokenValue2, tokenBalance1, tokenBalance2, reserves])

    return button

}
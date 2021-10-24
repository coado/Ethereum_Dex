import { useEffect, useState } from 'react';
import { Library } from 'web3-react/dist/context';
import { getReserves } from '../utils/functionCallsHelper';

type Reserves = {
    reserve0: number;
    reserve1: number;
}

export const useReserves = (
    pairAddress: string | null,
    pairExist: boolean, 
    token1Address: string | null, 
    library: Library
    ) => {
    const [ reserves, setReserves ] = useState<Reserves | null>(null)

    const prepareReserve = (reserve: string): number => {
        return Number(library.utils.fromWei(reserve, 'ether'))
    }

    type ReservesData = {
        _reserve0: string;
        _token0: string; 
        _reserve1: string;
        _token1: string;
    }

    useEffect(() => {
        if (pairExist && pairAddress) {
            getReserves(library, pairAddress).then((data: ReservesData | undefined) => {
                if (!data) return
                let reserve0: number
                let reserve1: number
                
                if (data._token0 === token1Address) {
                    reserve0 = prepareReserve(data._reserve0)
                    reserve1 = prepareReserve(data._reserve1)
                } else {
                    reserve0 = prepareReserve(data._reserve1)
                    reserve1 = prepareReserve(data._reserve0)
                }
                setReserves({
                    reserve0,
                    reserve1
                })
            }).catch((error: Error) => console.error(error))
        } 
    }, [pairAddress, token1Address])
    return reserves;    
}  

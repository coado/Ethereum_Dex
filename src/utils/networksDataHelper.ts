import { networksData } from '../networks';


export const getTokenAddress = (token: string, networkId: number ): string => {
    const tokensList = networksData[networkId].tokens
    return tokensList[token]
}

export const getChain = (networkId: number): string => {
    return networksData[networkId].name
}

export const getAllTokens = (networkId: number): { [key: string]: string } => {
    return networksData[networkId].tokens
}

export const getContractsAddresses = (networkId: number): { [key: string]: string } => {
    return networksData[networkId].contracts
}

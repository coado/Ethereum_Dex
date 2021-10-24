import erc20ABI from '../abis/erc20.abi';
import * as FactoryABI from '../abis/factory.abi';
import * as RouterABI from '../abis/router.abi';
import * as PairABI from '../abis/pair.abi';
import { Library } from 'web3-react/dist/context';
import { ABI } from '../abis/ABIinterfaces';

const createContract = (library: Library, abi: ABI[], address: string) => new library.eth.Contract(abi, address) 

// ERC20 Contracts
export const getErc20Contract = (library: Library, address: string) => createContract(library, erc20ABI, address)

// Router Contracts
export const getAddLiquidityContract = (library: Library, address: string) => createContract(library, RouterABI.addLiquidityABI, address)

// Factory Contracts
export const getPairContract = (library: Library, routerAddress: string) => createContract(library, FactoryABI.getPairABI, routerAddress)
// Pair Contracts
export const getReservesContract = (library: Library, address: string) => createContract(library, PairABI.getReservesABI, address)
export const getPairTokensContract = (library: Library, address: string) => createContract(library, PairABI.getPairTokensAddress, address)
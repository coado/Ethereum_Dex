
export interface ABI {
    anonymous?: boolean;
    constant?: boolean;
    inputs?: { [key: string]: string | boolean }[];
    name?: string;
    outputs?: { [key: string]: string}[];
    payable?: boolean;
    stateMutability?: string;
    type?: string;
}

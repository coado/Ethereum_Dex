
export interface NetworkData {
    name: string;
    tokens: { [key: string]: string};
    contracts: {[ key: string]: string};
}

export const networksData: { [key: string]: NetworkData} = {
    "1": {
        "name": "Mainnet",
        "tokens": {

        },
        "contracts": {

        }
    },
    "3": {
        "name": "Ropsten",
        "tokens": {
            
        },
        "contracts": {
            
        }
    },
    "4": {
        "name": "Rinkeby",
        "tokens": {
            "DAI": "0xc7ad46e0b8a400bb3c915120d284aafba8fc4735",
            "WETH":"0xc778417e063141139fce010982780140aa0cd5ab", 
            "BUSD": "",
            "GECKO": "",
            "BNB":"",
            "TOKEN1":"0x4E3b4ea45441D9834B48af4f34A48952E3A3c055",
            "TOKEN2":"0xf49A9eeb985e911f7B0822a6e6aaf07631710f76"
        },
        "contracts": {
            "Factory": "0xaAA0F68292F9DF4eC096cb8a454fC0a2E44AE093",
            "Router": "0xd93054592950D262775CC9b943E9444FdB0161Ed"
        }
    },
    "5": {
        "name": "Goerli",
        "tokens": {
            
        },
        "contracts": {
            
        }
    },
    "42": {
        "name": "Kovan",
        "tokens": {
            
        },
        "contracts": {
            
        }
    },
    "56": {
        "name": "BSC",
        "tokens": {
            
        },
        "contracts": {
            
        }
    },
    "97": {
        "name": "BSC Testnet",
        "tokens": {
            
        },
        "contracts": {
            
        }
    },
    "5777": {
        "name": "Ganache",
        "tokens": {
            
        },
        "contracts": {
            
        }
    }
}

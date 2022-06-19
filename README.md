# Check it out here: https://priceless-franklin-5bfbea.netlify.app/

This app is simply fork of Uniswap for learning purposes. All contracts were forked and deployed on the `Rinkeby` test network. The front-end was building from scratch. 

In order to check out how this app works, you will need some DAI and WETH tokens.

## How to get DAI:

1. Visit https://rinkeby.etherscan.io/address/0xc7ad46e0b8a400bb3c915120d284aafba8fc4735
2. Select "Contract" 

![image](https://user-images.githubusercontent.com/64146291/174457971-9f27455b-f7bf-4041-886e-38de0d042855.png)

3. Select "Write Contract" and connect your wallet (make sure to change network to Rinkeby on your wallet)

![image](https://user-images.githubusercontent.com/64146291/174458046-efa8c442-de5c-4c92-9601-441f4b3f21e1.png)

4. Unroll the mint tab and provide your wallet address and amount that you wish to mint. Click "write" and approve transaction on your wallet.

![image](https://user-images.githubusercontent.com/64146291/174470360-d78c01f1-aae4-4f19-ae7b-d7b6c81e2e97.png)

## How to get WETH

1. Visit https://rinkeby.etherscan.io/token/0xc778417e063141139fce010982780140aa0cd5ab
2. Select "Contract"
3. Select "Write Contract" and connect your wallet (make sure to change network to Rinkeby on your wallet)
4. Unroll the deposit tab and provide amount of ETH you want to deposit (you have to have eth on rinkeby network). Click "write" and approve transaction on your wallet.

![image](https://user-images.githubusercontent.com/64146291/174458620-4e9e29a2-8585-4f29-af5f-a7fae7c8ccda.png)



## How the pool works

The pool is simply a contract that contains a pair of tokens (let's assume DAI and WETH) and manages the price of these tokens. The price depends on the holding tokens ratio, for instance:

There is 100 DAI and 1 WETH in the pool. The user wants to swap 2 WETH for DAI.

x - amount of WETH in the pool
y - amount of DAI in the pool
dx - amount of WETH user provides
dy - amount of DAI user receives

xy = k

*K is constant value, it cannot be changed during swaping*

(x+dx)(y-dy) = k

dy = (y*dx) / (x+dx)

*there is a trading fee 0.3%*

dy = (y*dx*0.997) / (x+dx*0.997)

Users can add liquidity to the pool without changing the price of tokens. More liquidity = less price impact.

![image](https://user-images.githubusercontent.com/64146291/174471742-0984448f-0a82-4ebc-856f-169a04389893.png)

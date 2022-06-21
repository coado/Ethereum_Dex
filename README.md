# Check it out here: https://priceless-franklin-5bfbea.netlify.app/

<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#007ACC" d="M0 128v128h256V0H0z"/><path fill="#FFF" d="m56.612 128.85l-.081 10.483h33.32v94.68h23.568v-94.68h33.321v-10.28c0-5.69-.122-10.444-.284-10.566c-.122-.162-20.4-.244-44.983-.203l-44.74.122l-.121 10.443Zm149.955-10.742c6.501 1.625 11.459 4.51 16.01 9.224c2.357 2.52 5.851 7.111 6.136 8.208c.08.325-11.053 7.802-17.798 11.988c-.244.162-1.22-.894-2.317-2.52c-3.291-4.795-6.745-6.867-12.028-7.233c-7.76-.528-12.759 3.535-12.718 10.321c0 1.992.284 3.17 1.097 4.795c1.707 3.536 4.876 5.649 14.832 9.956c18.326 7.883 26.168 13.084 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.14 17.879-28.323 20.276c-4.388.772-14.79.65-19.504-.203c-10.28-1.828-20.033-6.908-26.047-13.572c-2.357-2.6-6.949-9.387-6.664-9.874c.122-.163 1.178-.813 2.356-1.504c1.138-.65 5.446-3.129 9.509-5.485l7.355-4.267l1.544 2.276c2.154 3.29 6.867 7.801 9.712 9.305c8.167 4.307 19.383 3.698 24.909-1.26c2.357-2.153 3.332-4.388 3.332-7.68c0-2.966-.366-4.266-1.91-6.501c-1.99-2.845-6.054-5.242-17.595-10.24c-13.206-5.69-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.617-1.22-12.678-.447-16.335c2.723-12.76 12.353-21.659 26.25-24.3c4.51-.853 14.994-.528 19.424.569Z"/></svg>

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
dy = 100*2 / (1+2) = `66.67 DAI`

*there is a trading fee 0.3%*

dy = (y*dx*0.997) / (x+dx*0.997)

Users can add liquidity to the pool without changing the price of tokens. More liquidity = less price impact.

![image](https://user-images.githubusercontent.com/64146291/174471742-0984448f-0a82-4ebc-856f-169a04389893.png)






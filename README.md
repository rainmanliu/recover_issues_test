# recover_issues

## Description
When recover a transfer starting with Ethereum TXid (transfer erc20 usdt to usdt.e on near): 
`0x87a48690b34d7e54c4dc4a2ca8bc8689193bed4c9ae0969d58a94f4af0e77788`   

it found the proof not used on near side, which cause the status remain in `in-progress`.  

But this transfer is marked as `Completed` on the official ranbow-bridge frontend. And it is true completed in fact. So, there must be something wrong with the way to call near-eth but we could NOT find it:
```
console.log(await nep141Xerc20.naturalErc20.recover('0x87a48690b34d7e54c4dc4a2ca8bc8689193bed4c9ae0969d58a94f4af0e77788', {
    nearProvider: new najProviders.JsonRpcProvider({ url: process.env.nearNodeUrl })
}))
```

The dependency we are using is as follow:
```
"dependencies": {
    "@near-eth/client": "^1.9.0",
    "@near-eth/near-ether": "^2.4.1",
    "@near-eth/nep141-erc20": "^2.4.1",
    "ethers": "^5.4.6"
  }
```

## Run the Code
```
npm i
npm run start_mainnet
```

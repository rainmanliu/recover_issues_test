import * as nep141Xerc20 from '@near-eth/nep141-erc20'
// import * as ethXnear from '@near-eth/near-ether'
import * as transfers from '@near-eth/client'
import * as ethXnear from './rainbow-bridge-client/packages/near-ether/dist/index.js'
import { ethers } from 'ethers'
import { providers as najProviders } from 'near-api-js'

async function main() {

    transfers.setEthProvider(new ethers.providers.InfuraProvider(
        process.env.ethNetworkId === 'main' ? 'mainnet' : process.env.ethNetworkId,
        // process.env.INFURA_ID
        '4317fe6561f54eb2aa8fbd9d52bc4557'
    ))

    transfers.setBridgeParams({
        nearEventRelayerMargin: Number(process.env.nearEventRelayerMargin),
        sendToNearSyncInterval: Number(process.env.sendToNearSyncInterval),
        sendToEthereumSyncInterval: Number(process.env.sendToEthereumSyncInterval),
        ethChainId: Number(process.env.ethChainId),
        erc20Abi: process.env.ethErc20AbiText,
        erc20LockerAddress: process.env.ethLockerAddress,
        erc20LockerAbi: process.env.ethLockerAbiText,
        nep141Factory: process.env.nearTokenFactoryAccount,
        nearTokenFactoryAccount: process.env.nearTokenFactoryAccount,
        nativeNEARLockerAddress: process.env.nativeNEARLockerAddress,
        eNEARAddress: process.env.eNEARAddress,
        eNEARAbi: process.env.eNEARAbiText,
        etherCustodianAddress: process.env.etherCustodianAddress,
        etherCustodianAbi: process.env.etherCustodianAbiText,
        auroraEvmAccount: process.env.auroraEvmAccount,
        etherExitToEthereumPrecompile: process.env.exitToEthereumPrecompile,
        ethClientAddress: process.env.ethClientAddress,
        ethClientAbi: process.env.ethNearOnEthClientAbiText,
        nearClientAccount: process.env.nearClientAccount
    })

    // console.log(await ethXnear.naturalETH.recover('0x8a98332f70ae537a3d5d9a642b7b68af9033c5a1a4008e8eb5ac1b875daf085e', {
    //     nearProvider: new najProviders.JsonRpcProvider({ url: process.env.nearNodeUrl })
    // }))

    // console.log(await nep141Xerc20.naturalErc20.recover('0x87a48690b34d7e54c4dc4a2ca8bc8689193bed4c9ae0969d58a94f4af0e77788', {
    //     nearProvider: new najProviders.JsonRpcProvider({ url: process.env.nearNodeUrl })
    // }))
    
    const lockhas = '0xeb24db2d6dee5ea02b62699ca924f2c62a2a3a26e33d96a1e1d0c253af613d7e'
    // ethXnear.naturalETH.recover('lockhas')
    ethXnear.naturalETH.recover(lockhas, transfers)
}
await main()
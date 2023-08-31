
// import * as ethXnear from './rainbow-bridge-client/packages/near-ether/dist/index.js'
import * as clientUtils from '@near-eth/utils/dist/index.js'
import { ethers } from 'ethers'
import express from 'express';
import { readFileSync } from "fs";

var app = express();
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");

    if (!req.query.ethAddress){
        res.send(JSON.stringify({
            code: -1,
            data: "Missing ethAddress"
        }));
        return 
    }
    if (!req.query.nearAccountId){
        res.send(JSON.stringify({
            code: -1,
            data: "Missing nearAccountId"
        }));
        return 
    }

    try{
        let transfer = await syncTransfers({ethAddress: req.query.ethAddress, nearAccountId: req.query.nearAccountId})
        res.send(JSON.stringify({
            code: 0,
            data: transfer
        }));
    } catch (error) {
        res.send(JSON.stringify({
            code: -1,
            data: error
        }));
    }
})

app.post('/findETHProof', async function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    let ethProvider = new ethers.providers.InfuraProvider(
        'mainnet',
        // process.env.INFURA_ID
        '4317fe6561f54eb2aa8fbd9d52bc4557'
    )
    let etherCustodianAbi = readFileSync('./abi/etherCustodian.full.abi')
    console.log("***********start*************")
    let proof = await clientUtils.findEthProof(
        'Deposited',
        req.body.transactionHash,
        '0x6BFaD42cFC4EfC96f529D786D643Ff4A8B89FA52',
        etherCustodianAbi.toString(),
        ethProvider
    )
    console.log("***********get proof*************")
    console.log("proof")
    res.send(JSON.stringify({
        code: 0,
        data: proof
    }));

})

app.get('/test', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");

    console.log("xxxxxx")
    res.send("1321321312312")
})

var server = app.listen(8400, '0.0.0.0', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server addr: http://%s:%s", host, port)
})
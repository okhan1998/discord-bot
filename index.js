const express = require('express');
const { port } = require('./config.json');
const bodyParser = require('body-parser');
const Caver = require('caver-js')

require('./bot');


const CONTRACT_ADDR = '0x3990df2B9BecD6D49Aedf8bEc090f19cD5405a85'
let contract = null; 

const rpcURL = 'https://public-node-api.klaytnapi.com/v1/cypress';
const networkID = '8271';
const caver = new Caver(rpcURL);

// const WALLET_ADDR = '0x7E31E8bb71AF884832Ba5dAe68Ff22874A15aD6A';
async function initContract() {
    contract = await caver.kct.kip17.create(CONTRACT_ADDR);
    console.log('initContract ok')
    // let ret;
    // ret = await contract.totalSupply();
    // console.log('totalSupply', ret);
    // ret = await contract.balanceOf(WALLET_ADDR);
    // console.log('balanceOf', ret);
}
initContract();


// redirect url
// http://localhost:53134
// https://discord.com/api/oauth2/authorize?client_id=972061571868131428&redirect_uri=http%3A%2F%2Flocalhost%3A53134&response_type=code&scope=identify


const app = express();
app.use(bodyParser.json());

app.get('/', (request, response) => {
	return response.sendFile('index.html', { root: '.' });
});

app.post('/api_wallet', async (request, response) => {
    console.log('api_wallet', request.body);
    const addr = request.body.addr;
    let ret;
    ret = await contract.balanceOf(addr)
    const count = +ret;
    return response.json({
        code:200,
        message: 'ok',
        count 
    });
});

app.post('/api_discord_connect', async (request, response) => {
    console.log('api_discord_connect', request.body);
    return response.json({
        code: 200,
        message: 'ok',
    })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
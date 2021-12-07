
const NODE_URL = "https://speedy-nodes-nyc.moralis.io/1358ee5e1e4a0756f9764560/polygon/mainnet";
const provider = new Web3.providers.HttpProvider(NODE_URL);
const web3 = new Web3(provider);
const fromWei = web3.utils.fromWei

web3.eth.getBlockNumber(function (error, result) {
    console.log(result)
  })

Moralis.initialize("SN0in6V1qRiAfWr9HK0kT4TUlV6j8MPAPVDuad8h"); // Application id from moralis.io
Moralis.serverURL = "https://qgcfzpwti3cv.usemoralis.com:2053/server"; //Server url from moralis.io

let ERC20ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [{ "name": "", "type": "string" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_spender", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "approve",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_from", "type": "address" },
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transferFrom",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [{ "name": "", "type": "uint8" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [{ "name": "_owner", "type": "address" }],
      "name": "balanceOf",
      "outputs": [{ "name": "balance", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [{ "name": "", "type": "string" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [{ "name": "", "type": "bool" }],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        { "name": "_owner", "type": "address" },
        { "name": "_spender", "type": "address" }
      ],
      "name": "allowance",
      "outputs": [{ "name": "", "type": "uint256" }],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    { "payable": true, "stateMutability": "payable", "type": "fallback" },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "owner", "type": "address" },
        { "indexed": true, "name": "spender", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        { "indexed": true, "name": "from", "type": "address" },
        { "indexed": true, "name": "to", "type": "address" },
        { "indexed": false, "name": "value", "type": "uint256" }
      ],
      "name": "Transfer",
      "type": "event"
    }
  ]

const POLYGON_MAINNET = 'https://polygon-mainnet.infura.io/v3/'
const ONEINCH = 'https://api.1inch.exchange/'
const WALLET_ADDR = '0x008062acA356B5F93F2F14b71Fd73db91A606d0C'
const SHI3LD_ADDR = '0xf239e69ce434c7fb408b05a0da416b14917d934e'
const KOGE_ADDR = '0x13748d548D95D78a3c83fe3F32604B4796CFfa23'
const PEAR_ADDR = '0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44'
const SING_ADDR = '0xCB898b0eFb084Df14dd8E018dA37B4d0f06aB26D'
const USDC_ADDR = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'

let tokens = {}

let myTable = document.querySelector('#table');

async function getPrice(address, balance){

    // let price = await Moralis.Cloud.run("getPrice", {address: address});
    // let usdP = price.usdPrice*balance + "USD";
    let url = "https://api.1inch.exchange/v3.0/137/quote?fromTokenAddress=" + address +"&toTokenAddress=" + USDC_ADDR + "&amount=" + balance 
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let value = data.toTokenAmount
        value = fromWei(value, 'mwei')
        console.log(value)
        document.getElementById("usd_price").innerHTML = value;
    })
    .catch(error => {
        console.log(error)
    });

}

async function getTokens() {
    // let address = document.getElementById("address").value;
    const tokenArr = [SHI3LD_ADDR, KOGE_ADDR, PEAR_ADDR, SING_ADDR];
    console.log(tokenArr)

    for (let token in tokenArr) {
        tokens[tokenArr[token]] = {}
        let checksum = web3.utils.toChecksumAddress(tokenArr[token])
        let contract = new web3.eth.Contract(ERC20ABI,checksum);

        let symbol = await contract.methods.symbol().call()
        tokens[tokenArr[token]]['symbol'] = symbol

        let decimals = await contract.methods.decimals().call()
        tokens[tokenArr[token]]['decimals'] = decimals

        let balance = await contract.methods.balanceOf(WALLET_ADDR).call()
        tokens[tokenArr[token]]['balance'] = balance

        console.log(symbol,balance);
    }

    console.log(tokens);

    let table = document.createElement('table');
    Object.keys(tokens).map((element, i) => {
        console.log(element);
        console.log(tokens[element].symbol);

        let row = document.createElement('tr');

        let name = document.createElement('td');
        name.appendChild(document.createTextNode(tokens[element].symbol));
        row.appendChild(name);

        let balance = document.createElement('td');
        let balConvert = tokens[element].balance/("1e" + tokens[element].decimals);
        balance.appendChild(document.createTextNode(balConvert));
        row.appendChild(balance);


        let button = document.createElement('td');
        var btn = document.createElement('button');
        btn.innerHTML = "Convert"
        btn.addEventListener("click", function () {
            document.getElementById("info").innerHTML = tokens[element].symbol + " - USD Balance:";
            getPrice(element, tokens[element].balance);

          });
        button.appendChild(btn);
        row.appendChild(button);

        table.appendChild(row);

    
})

        myTable.appendChild(table);
}



document.getElementById("button").addEventListener("click", getTokens);
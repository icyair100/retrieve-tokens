Moralis.initialize("SN0in6V1qRiAfWr9HK0kT4TUlV6j8MPAPVDuad8h"); // Application id from moralis.io
Moralis.serverURL = "https://qgcfzpwti3cv.usemoralis.com:2053/server"; //Server url from moralis.io

let myTable = document.querySelector('#table');
async function getPrice(address, balance){

    let price = await Moralis.Cloud.run("getPrice", {address: address});
    let usdP = price.usdPrice*balance + "USD";
    document.getElementById("usd_price").innerHTML = usdP;
}

async function getTokens() {
    let address = document.getElementById("address").value;
    // console.log(address);
    let balances = await Moralis.Cloud.run("getTokens", {address: address});
    // let SHI3LD = "0xf239e69ce434c7fb408b05a0da416b14917d934e";
    // let KOGE = "0x13748d548D95D78a3c83fe3F32604B4796CFfa23";
    // let PEAR = "0xc8bcb58caEf1bE972C0B638B1dD8B0748Fdc8A44";
    // let SING = "0xCB898b0eFb084Df14dd8E018dA37B4d0f06aB26D";
    // let t_Array = [SHI3LD, KOGE, PEAR, SING];
    console.log(balances);
    let table = document.createElement('table');
    balances.map((element, i) => {
        console.log(element.token_address);

        let row = document.createElement('tr');

        let name = document.createElement('td');
        name.appendChild(document.createTextNode(element.name));
        row.appendChild(name);

        let balance = document.createElement('td');
        let balConvert = element.balance/("1e" + element.decimals);
        balance.appendChild(document.createTextNode(balConvert));
        row.appendChild(balance);

        let symbol = document.createElement('td');
        symbol.appendChild(document.createTextNode(element.symbol));
        row.appendChild(symbol);

        let button = document.createElement('td');
        var btn = document.createElement('button');
        btn.innerHTML = "Convert"
        btn.addEventListener("click", function () {
            document.getElementById("info").innerHTML = element.symbol + " - USD Balance:";
            getPrice(element.token_address, balConvert);

          });
        // btn.onclick = getPrice(element.token_address, balConvert);
        button.appendChild(btn);
        row.appendChild(button);

        table.appendChild(row);

    
})

        myTable.appendChild(table);
}



document.getElementById("button").addEventListener("click", getTokens);
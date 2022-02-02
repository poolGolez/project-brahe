import Web3 from 'web3';

let web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum)
    console.log("Web3 in the browser");
} else {
    const NETWORK_URL = "https://rinkeby.infura.io/v3/5b13442197b6448487079169e4fad4e3";
    const provider = new Web3.providers.HttpProvider(NETWORK_URL)
    web3 = new Web3(provider);
    console.log("Web3 in the http provider");
}

export default web3;

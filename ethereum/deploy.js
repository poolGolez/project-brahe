const Web3 = require('web3');
const HdWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory = require('./build/GatheringFactory.json');

const MNEMONIC = 'member minor fork shy father sister palace rhythm harsh above advice meadow';
const NETWORK_URL = 'https://rinkeby.infura.io/v3/5b13442197b6448487079169e4fad4e3';
const provider = new HdWalletProvider(MNEMONIC, NETWORK_URL);
const web3 = new Web3(provider);
const MANAGER_ADDRESS = '0x8342358C5E2034956b14734874fB01C362531092';

const deploy = async () => {
    try {
        const contractInterface = new web3.eth.Contract(compiledFactory.abi);
        const factory = await contractInterface
            .deploy({ data: compiledFactory.evm.bytecode.object })
            .send({ from: MANAGER_ADDRESS, gas: '3000000' });
        const address = factory.options.address;

        console.log("Deployed instance @ ", address);
    } catch (err) {
        console.error("Error:", err);
    }

    provider.engine.stop();
};

deploy();
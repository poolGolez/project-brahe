const Web3 = require('web3');
const HdWalletProvider = require('@truffle/hdwallet-provider');
const compiledFactory = require('./build/GatheringFactory.json');

require('dotenv').config();

const provider = new HdWalletProvider(process.env.MNEMONIC, process.env.NETWORK_URL);
const web3 = new Web3(provider);

const deploy = async () => {
    try {
        const contractInterface = new web3.eth.Contract(compiledFactory.abi);
        const factory = await contractInterface
            .deploy({ data: compiledFactory.evm.bytecode.object })
            .send({ from: process.env.ROOT_ADDRESS, gas: '3000000' });
        const address = factory.options.address;

        console.log("Deployed instance @ ", address);
    } catch (err) {
        console.error("Error:", err);
    }

    provider.engine.stop();
};

console.log("Starting deployment...")
deploy();
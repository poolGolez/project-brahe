const FACTORY_ADDRESS = '0x5ED2ae67bAf35069B14325C88B470d4054eAcB13';

import web3 from './web3';
const compiledFactory = require('./build/GatheringFactory.json');
const GatheringFactory = new web3.eth.Contract(compiledFactory.abi, FACTORY_ADDRESS);

const compiledGathering = require('./build/Gathering.json');
const Gathering = function (address) {
    return new web3.eth.Contract(compiledGathering.abi, address);
}

export { GatheringFactory, Gathering };
const FACTORY_ADDRESS = '0xb959EBb9f59090CdD123254F88f6cc95528cc9B9';

import web3 from './web3';
const compiledFactory = require('./build/GatheringFactory.json');
const GatheringFactory = new web3.eth.Contract(compiledFactory.abi, FACTORY_ADDRESS);

const compiledGathering = require('./build/Gathering.json');
const Gathering = function (address) {
    return new web3.eth.Contract(compiledGathering.abi, address);
}

export { GatheringFactory, Gathering };
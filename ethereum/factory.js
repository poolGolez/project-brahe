const FACTORY_ADDRESS = '0x874348a8B9B6f09258bb0F1B7A39b28f4ad6a0bf';

import web3 from './web3';
const compiledFactory = require('./build/GatheringFactory.json');
const GatheringFactory = new web3.eth.Contract(compiledFactory.abi, FACTORY_ADDRESS);

const compiledGathering = require('./build/Gathering.json');
const Gathering = function (address) {
    return new web3.eth.Contract(compiledGathering.abi, address);
}

export { GatheringFactory, Gathering };
const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');

const compiledGathering = require('../../../ethereum/.build/Gathering.json');
let web3;
let manager;

describe('Gathering', () => {
    beforeEach(async () => {
        web3 = new Web3(ganache.provider());
        [manager] = await web3.eth.getAccounts();
    });

    describe('initialization', () => {
        it('should set the name of the gathering', async () => {
            const gathering = await createGathering('Ethereum Summit 2021', 25);

            assert.equal('Ethereum Summit 2021', await gathering.methods.name().call());
        });

        it('should set the downpayment of the gathering', async () => {
            const gathering = await createGathering('Ethereum Summit 2021', 25);

            assert.equal(25, await gathering.methods.downpayment().call());
        });

        it('should set the sender as the manager of the gathering', async () => {
            const gathering = await createGathering('Ethereum Summit 2021', 25);

            assert.equal(manager, await gathering.methods.manager().call());
        });
    });

    async function createGathering(name, downpayment) {
        return await new web3.eth.Contract(compiledGathering.abi)
            .deploy({
                data: compiledGathering.evm.bytecode.object,
                arguments: [name, downpayment]
            })
            .send({
                from: manager,
                gas: '1000000'
            });
    }
});

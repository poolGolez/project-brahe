const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');

const compiledGathering = require('../../../ethereum/build/Gathering.json');
let web3;
let manager;
let guest1;

describe('Gathering', () => {
    beforeEach(async () => {
        web3 = new Web3(ganache.provider());
        [manager, guest1] = await web3.eth.getAccounts();
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

    describe('join', () => {
        let gathering;
        beforeEach(async () => {
            gathering = await createGathering('JS Summit 2022', 12);
        });

        it('should register the participant', async () => {
            await gathering.methods
                .join()
                .send({
                    from: guest1,
                    value: 12
                });

            assert.equal(true, await gathering.methods.isParticipant().call({ from: guest1 }));
            assert.equal(1, await gathering.methods.participantsCount().call());
        });

        it('should raise error if participant pays less than the set downpayment', async () => {
            try {
                await gathering.methods
                    .join()
                    .send({
                        from: guest1,
                        value: 10
                    });
            } catch (err) {
                assertError("Insufficient funds to make a downpayment.", err);
                return;
            }
            assert.fail("No error was thrown.");
        });

        it('should raise error if the participant has already joined', async () => {
            await gathering.methods
                .join()
                .send({
                    from: guest1,
                    value: 12
                });

            try {
                await gathering.methods
                    .join()
                    .send({
                        from: guest1,
                        value: 12
                    });
            } catch (err) {
                assertError("Already registered to the gathering.", err);
                return;
            }
            assert.fail("No error was thrown.");
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

    function assertError(message, error) {
        const key = Object.keys(error.results)[0]
        assert.equal(message, error.results[key].reason);
    }
});

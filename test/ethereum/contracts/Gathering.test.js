const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');

const compiledGathering = require('../../../ethereum/build/Gathering.json');
let Gathering;
let web3;
let manager;
let guest1;

describe('Gathering', () => {
    beforeEach(async () => {
        web3 = new Web3(ganache.provider());
        [manager, guest1] = await web3.eth.getAccounts();
        Gathering = await new web3.eth.Contract(compiledGathering.abi);
    });

    describe('initialization', () => {
        it('should set the name of the gathering', async () => {
            const gathering = await _createGathering('Ethereum Summit 2021', 25);

            assert.strictEqual(await gathering.methods.name().call(), 'Ethereum Summit 2021');
        });

        it('should set the downpayment of the gathering', async () => {
            const gathering = await _createGathering('Ethereum Summit 2021', 25);

            assert.strictEqual(await gathering.methods.downpayment().call(), '25');
        });

        it('should set the sender as the manager of the gathering', async () => {
            const gathering = await _createGathering('Ethereum Summit 2021', 25);

            assert.strictEqual(await gathering.methods.manager().call(), manager);
        });
    });

    describe('state management', () => {
        it('should start at INITIALIZED state', async () => {
            const gathering = await _createGathering();

            assert.strictEqual(await gathering.methods.status().call(), 'INITIALIZED');
        });

        describe('openInvitation', () => {
            let gathering;
            beforeEach(async () => {
                gathering = await _createGathering();
            });

            it('should change the status: INITIALIZED => INVITATION_OPEN', async () => {
                await gathering.methods
                    .openInvitation()
                    .send({ from: manager });

                assert.strictEqual(await gathering.methods.status().call(), 'INVITATION_OPEN');
            });

            it('should raise error if NOT called by a manager', async () => {
                await _assertErrorThrown(async () => {
                    await gathering.methods
                        .openInvitation()
                        .send({ from: guest1 });

                }, "Operation is restricted to the manager only.");
            });

            it('should raise error if the current status is not INITIALIZED', async () => {
                await gathering.methods
                    .openInvitation()
                    .send({ from: manager });

                await _assertErrorThrown(async () => {
                    await gathering.methods
                        .openInvitation()
                        .send({ from: manager });

                }, "Can't perform operation with the current status.");
            });
        });

        describe('closeInvitation', () => {
            let gathering;
            beforeEach(async () => {
                gathering = await _createGathering();
                await gathering.methods
                    .openInvitation()
                    .send({ from: manager });
            });

            it('should change the status: INVITATION_OPEN => INVITATION_CLOSED', async () => {
                await gathering.methods
                    .closeInvitation()
                    .send({ from: manager });

                assert.strictEqual(await gathering.methods.status().call(), 'INVITATION_CLOSED');
            });

            it('should raise error if NOT called by a manager', async () => {
                await _assertErrorThrown(async () => {
                    await gathering.methods
                        .closeInvitation()
                        .send({ from: guest1 });

                }, "Operation is restricted to the manager only.");
            });

            it('should raise error if the current status is not INVITATION_OPEN', async () => {
                await gathering.methods
                    .closeInvitation()
                    .send({ from: manager });

                await _assertErrorThrown(async () => {
                    await gathering.methods
                        .closeInvitation()
                        .send({ from: manager });

                }, "Can't perform operation with the current status.");
            });
        });
    });

    describe('join', () => {
        let gathering;
        beforeEach(async () => {
            gathering = await _createGathering('JS Summit 2022', 12);
            await gathering.methods
                .openInvitation()
                .send({ from: manager });
        });

        it('should register the participant', async () => {
            await gathering.methods
                .join()
                .send({
                    from: guest1,
                    value: 12
                });

            assert.strictEqual(await gathering.methods.isParticipant().call({ from: guest1 }), true);
            assert.strictEqual(await gathering.methods.participantsCount().call(), '1');
        });

        it('should raise error if participant pays less than the set downpayment', async () => {
            await _assertErrorThrown(async () => {
                await gathering.methods
                    .join()
                    .send({
                        from: guest1,
                        value: 10
                    });
            }, "Insufficient funds to make a downpayment.");
        });

        it('should raise error if the participant has already joined', async () => {
            await gathering.methods
                .join()
                .send({
                    from: guest1,
                    value: 12
                });

            await _assertErrorThrown(async () => {
                await gathering.methods
                    .join()
                    .send({
                        from: guest1,
                        value: 12
                    });
            }, "Already registered to the gathering.");
        });
    });

    async function _createGathering(name, downpayment) {
        name = name || 'JS Summit';
        downpayment = downpayment || 12;
        return await Gathering
            .deploy({
                data: compiledGathering.evm.bytecode.object,
                arguments: [name, downpayment]
            })
            .send({
                from: manager,
                gas: '1000000'
            });
    }

    async function _assertErrorThrown(fn, errorMessage) {
        try {
            await fn();
        } catch (err) {
            _assertError(errorMessage, err);
            return;
        }
        assert.fail("No error was thrown.");
    }

    function _assertError(message, error) {
        const key = Object.keys(error.results)[0];
        assert.strictEqual(error.results[key].reason, message);
    }
});

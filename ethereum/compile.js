const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const CONTRACTS_DIR = path.join(__dirname, 'contracts');
const BUILD_DIR = path.join(__dirname, 'build');

compile();
console.log("Compiled files!");

function compile() {
    const filenames = fs.readdirSync(CONTRACTS_DIR);

    const sources = filenames.reduce((result, filename) => {
        const completePath = path.join(CONTRACTS_DIR, filename);
        const source = fs.readFileSync(completePath, 'utf-8');
        result[filename] = {content: source};

        return result;
    }, {});

    const outputSelection = {
        "*": {
            "*": [
                "metadata",
                "evm.bytecode", // Enable the metadata and bytecode outputs of every single contract.
                "evm.bytecode.sourceMap" // Enable the source map output of every single contract.
            ],
        },
    };
    console.log(sources);

    const compiled = solc.compile(JSON.stringify({
        language: 'Solidity',
        sources,
        settings: {
            outputSelection
        }
    }));

    console.debug(compiled);

};

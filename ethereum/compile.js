const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const CONTRACTS_DIR = path.join(__dirname, 'contracts');
const BUILD_DIR = path.join(__dirname, 'build');

(function() {
    clearBuildDir();
    const compiled = compile();
    saveToBuildDir(compiled);

    function clearBuildDir() {
        if(fs.existsSync(BUILD_DIR)) {
            fs.emptyDirSync(BUILD_DIR);
        } else {
            fs.mkdirSync(BUILD_DIR);
        }
    }

    function saveToBuildDir(compiled) {
        Object.keys(compiled.contracts).forEach(fileName => {
            const compiledFile = compiled.contracts[fileName];
            Object.keys(compiledFile).forEach(contractName => {
                const compiledContract = compiledFile[contractName];
                const compiledContractPath = path.join(BUILD_DIR, `${contractName}.json`);

                fs.outputJSONSync(compiledContractPath, compiledContract);
            });
        });
    }

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
                    "abi",
                    // "metadata",
                    "evm.bytecode", // Enable the metadata and bytecode outputs of every single contract.
                    // "evm.bytecode.sourceMap" // Enable the source map output of every single contract.
                ],
            },
        };
        const compiled = solc.compile(JSON.stringify({
            language: 'Solidity',
            sources,
            settings: {
                outputSelection
            }
        }));

        return JSON.parse(compiled);
    };
})();
console.log("Compiled files!");

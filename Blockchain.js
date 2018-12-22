/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {
    constructor() {
        this.bd = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    async generateGenesisBlock(){
        const height = await this.getBlockHeight();
        if (height === 0) {
            const block = new Block.Block('Genesis Block')
            block.time = this.time();
            block.hash = this.hash(block);
            this.bd.addLevelDBData(block.height, JSON.stringify(block));
        }
    }

    time() { return new Date().getTime().toString().slice(0, -3) }

    hash(obj) { return SHA256(JSON.stringify(obj)).toString() }

    async getBlockHeight() { return await this.bd.getBlocksCount() - 1 }

    async addBlock(block) {
        const height = await this.getBlockHeight();
        block.height = height + 1;
        block.time = this.time();

        if (block.height > 0) {
            const pBlock = await this.getBlock(height);
            block.previousBlockHash = pBlock.hash
        } else {
            await this.generateGenesisBlock();
        }

        block.hash = this.hash(block);
        return this.bd.addLevelDBData(block.height, JSON.stringify(block))
    }

    async getBlock(height) {
        return JSON.parse(await this.bd.getLevelDBData(height));
    }

    async validateBlock(height) {
        const block = await this.getBlock(height)
        const blockHash = block.hash
        block.hash = ''
        const validBlockHash = this.hash(block)
        return validBlockHash === blockHash ? true : false;
    }

    async validateChain() {
        const height = await this.getBlockHeight()
        const promisesArray = []
        promisesArray.push(await this.validateBlock(0))
        for (let i = 1; i < height + 1; i++) {
            promisesArray.push(
                await this.validateBlock(i),
                await this.validateLink(i)
            );
        }
        return Promise.all(promisesArray).then(valuesArray => {
            return !valuesArray.toString().includes('f');
        })
    }

    async validateLink (height) {
        const block = await this.getBlock(height);
        const pBlock = await this.getBlock(height - 1);
        return block.previousBlockHash === pBlock.hash ? true : false;
    }

    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block)
                .toString())
                .then((blockModified) => resolve(blockModified))
                .catch((err) => reject(err));
        });
    }
}

module.exports.Blockchain = Blockchain;

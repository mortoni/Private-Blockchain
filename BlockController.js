const SHA256 = require('crypto-js/sha256');
const Block = require('./Block.js');
const BlockChain = require('./BlockChain.js');

let myBlockChain = new BlockChain.Blockchain();

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        // this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
        this.validateChain();
        this.validateBlock();
        this.getBlockHeight();
    }



    isIndex(i) {
        return !isNaN(parseFloat(i)) && i >= 0;
    }

    getBlockByIndex() {
        this.app.get("/api/block/:index", (req, res) => {
            const { index } = req.params;

            if (!this.isIndex(index)) {
                res.send('The parameter is not valid!');
            } else {
                myBlockChain.getBlockHeight().then((maxHeight) => {
                    if (maxHeight && index <= maxHeight) {
                        myBlockChain.getBlock(index).then((block) => {
                            res.json(block);
                        }).catch((err) => console.log(err));
                    } else {
                        res.send(`the height(${index}) parameter is out of bounds`);
                    }
                });
            }
        });
    }

    postNewBlock() {
        this.app.post("/api/block", (req, res) => {
            if (req.body.data) {
                let block = new Block.Block(req.body.data);
                myBlockChain.addBlock(block).then((result) => {
        			res.json(block);
        		});
            } else {
                res.send('The block has no content!');
            }
        });
    }

    validateChain() {
        this.app.get("/api/validateChain", (req, res) => {

            myBlockChain.validateChain().then((errorLog) => {
            	if(errorLog.length > 0){
            		res.json({isValid: false});
            	} else {
            		res.json({isValid: true});
            	}
            }).catch((error) => res.json({ isValid: null }));
        });
    }

    validateBlock() {
        this.app.get("/api/validateBlock/:index", (req, res) => {
            const { index } = req.params;

            if (!this.isIndex(index)) {
                res.send('The parameter is not valid!');
            } else {
                myBlockChain.validateBlock(index).then((valid) => {
                	res.json({ isValid: valid });
                }).catch((error) => res.json({ isValid: null }));
            }
        });

    }

    getBlockHeight() {
        this.app.get("/api/getBlockHeight", (req, res) => {
            myBlockChain.getBlockHeight().then((height) => {
            	res.json({ height });
            }).catch((err) => res.json({ height: null }));
        });
    }


    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new Block.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

module.exports = (app) => { return new BlockController(app);}

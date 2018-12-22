/* ===== Executable Test ==================================
|  Use this file to test your project.
|  =========================================================*/

const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function () {
	console.log("Waiting...")
}, 10000);

/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/
(function theLoop (i) {
	setTimeout(function () {
		let tBlock = new Block.Block("tBlock " + (i + 1));
		myBlockChain.addBlock(tBlock).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 5000);
  })(0);


/***********************************************
 ** Function to get the Height of the Chain ****
 ***********************************************/
myBlockChain.getBlockHeight().then((height) => {
	console.log(`BLOCK HEIGHT [${height}]`);
}).catch((err) => console.log(err));


/***********************************************
 ******** Function to Get a Block  *************
 ***********************************************/
myBlockChain.getBlock(0).then((block) => {
	console.log(`GENESIS BLOCK ${JSON.stringify(block)}`);
}).catch((err) => console.log(err));


/***********************************************
 ***************** Validate Block  *************
 ***********************************************/
myBlockChain.validateBlock(0).then((valid) => {
	console.log(`BLOCK 1 VALIDITY ${valid}`);
}).catch((error) => console.log(error));

myBlockChain.getBlock(5).then((block) => {
	let blockAux = block;
	blockAux.body = "Tampered Block";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			myBlockChain.validateBlock(blockAux.height).then((valid) => {
				console.log(`BLOCK #${blockAux.height}, IS VALID? = ${valid}`);
			})
			.catch((error) => {
				console.log(error);
			})
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => console.log(err));
}).catch((err) => console.log(err));

myBlockChain.getBlock(6).then((block) => {
	let blockAux = block;
	blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			console.log("THE BLOCK WAS MODIFIED");
		} else {
			console.log("THE BLOCK WANS'T MODIFIED");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});

/***********************************************
 ***************** Validate Chain  *************
 ***********************************************/
myBlockChain.validateChain().then((errorLog) => {
	if(errorLog.length > 0){
		console.log("THE BLOCKCHAIN IS NOT VALID");
		errorLog.forEach(error => {
			console.log(error);
		});
	} else {
		console.log("THE BLOCKCHAIN IS VALID");
	}
}).catch((error) => console.log(error))

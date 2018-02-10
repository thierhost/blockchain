const User = require('./models/user');
const Blockchain = require('./models/blockchain');
/*
let user = new User("thiernothiam@esp.sn", 'repasser', 'demba sarr', 1200);
let user2 = new User('DeyineJiddou@master.com', 'commit', 'git checkout', 3000);

user.generateKeys();
user2.generateKeys();
let trans = user.createTransaction(1000, user2.publicKey);
console.log(trans);
console.log(user2.verify(trans.signature, trans.from, trans.value));


*/



let wethite = new Blockchain(10);

// generate the genesis

wethite.genesisBlock();
//generate a new block and broadcast it

let block = wethite.generateNextBlock('dembasarr');

//broadcast block

block.mine(wethite.getDifficulty());

//add it to the blockchain
wethite.addBlock(block);


console.log((wethite))

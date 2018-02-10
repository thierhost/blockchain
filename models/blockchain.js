const Transaction = require('./transaction');
const Block = require('./block')
const BlockchainClasse = function (difficulty){

    this.difficulty =   difficulty ;
    this.blocks = [];

    /**
     * generate the first block in our blockchain
     */
    this.genesisBlock = () => {
        const timeStamp = new Date().getTime();
        let firstTransaction = new Transaction('System', 'Mister Thier', 400000000000, null, 'coinBase');
        let firstBlock  = new Block(0,0,1);
        firstBlock.addTransaction(firstTransaction);
        firstBlock.mine(this.difficulty);
        firstBlock.setTimeStamp(timeStamp);
        this.blocks.push(firstBlock);
    };

    this.getLatestBlock = () => this.blocks[this.blocks.length - 1];

    /**
     * generate a new block and send the money to mineur and this transaction as first
     * @return {BlockClasse}
     */
    this.generateNextBlock = (mineur) => {

        let lastBlock = this.getLatestBlock();

        let newBlock = new Block( lastBlock.getIndex()+ 1 , lastBlock.getHash(), 2);
        newBlock.addTransaction( new Transaction('System', mineur, 12344, null, 'coinBase'));
        return newBlock;

    };

    /**
     * add a new block in the blockchain
     */

    this.addBlock = (block) => {
        block.mine(this.difficulty);
        this.blocks.push(block);
    };

    /**
     * get difficulty
     */

    this.getDifficulty = () => this.difficulty;
};

module.exports = BlockchainClasse;
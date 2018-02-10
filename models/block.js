const sha256 = require('sha256');

const BlockClasse = function (index,  prevHash,  maxTransaction ){

    this.index = index;
    this.nonce = 0;
    this.prevHash = prevHash;
    this.maxTransaction = maxTransaction;
    this.transactions = [];
    this.hash = "";
    this.timeStamp = "";

    /*
     * add transaction to our block
     * A bloack is a set of transaction with some others attributes
     */
    this.addTransaction =  (transaction) => {
        if(this.transactions.length < maxTransaction )
            this.transactions.push(transaction);
    };

    this.toString = () => {
        return this.index + this.nonce + this.prevHash + this.maxTransaction + JSON.stringify(this.transactions);
    };

    /**
     * generate the hash of this block using sha256
     */
    this.generateHash = () => {
        return sha256(this.toString());
    };

    /**
     * mine a block to determine proff of work
     */

    this.mine = (difficulty) => {
        let setofZeros = this.zeros(difficulty);
        let mine = false;
        this.hash = this.generateHash();
        while (mine == false){
            this.nonce ++;
           if (this.getHash().substr(0, difficulty) == setofZeros){
                mine = true;
                break;

            }
            this.hash = this.generateHash();
        }
    };

    /**
     *
     * @param difficulty
     * @return {*}
     */
    this.zeros =  (difficulty) => {
        if(difficulty == 1){
            return '0';
        }else{
            return '0'+ this.zeros(difficulty-1);
        }
    };

    this.setTimeStamp = (timeStamp) => this.timeStamp = timeStamp;
    this.getIndex = () => this.index;
    this.getHash = () => this.hash;
};

module.exports = BlockClasse;
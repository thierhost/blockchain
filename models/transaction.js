
const TransactionClasse = function (from, to, value, signature, type){

    this.from = from;
    this.to = to;
    this.value = value;
    this.signature = signature;
    this.type = type; // paye or coinbase. paye => is used for client to client, coinBase just for generate a new block

};

module.exports = TransactionClasse;
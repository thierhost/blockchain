const Transaction  = require('./transaction');
const chilkat = require('chilkat_node8_macosx');

const UserClasse = function (email, password, payload, solde){
     this.email = email;
     this.password = password;
     this.payload = payload;
     this.privateKey = "";
     this.publicKey = "";
     this.solde = solde;

    /**
     * this function is designed to generate public and private key
     * for user based on his email, password and payload
     * for more explaination about generation keys look at
     * https://www.example-code.com/nodejs/rsa_encryptStrings.asp
     */
    this.generateKeys = () => {
        let rsa = new chilkat.Rsa();
        let success = rsa.UnlockComponent(this.payload + this.email +  this.password);
        if (success !== true) {
            console.log("RSA component unlock failed");
            return 0;
        }
        success = rsa.GenerateKey(1024);
        if (success !== true) {
            console.log(rsa.LastErrorText);
            return 0;
        }
        //  Keys are exported in XML format:
        this.publicKey = rsa.ExportPublicKey();
        this.privateKey = rsa.ExportPrivateKey();
    };

    /**
     * this function is designed to sign a data
     * we will use here the private key to sign data
     * @return signature
     */
    this.sign = (data) => {
        let rsaEncryptor = new chilkat.Rsa();
        //  Encrypted output is always binary.  In this case, we want
        //  to encode the encrypted bytes in a printable string.
        //  Our choices are "hex", "base64", "url", "quoted-printable".
        rsaEncryptor.EncodingMode = "hex";

        //  We'll encrypt with the private key and decrypt with the public
        //  key.  It's also possible to do the reverse.
        success = rsaEncryptor.ImportPrivateKey(this.privateKey);
        let usePrivateKey = true;
        return rsaEncryptor.EncryptStringENC(data,usePrivateKey);
    };

    /**
     * this function is designed to verify if the sender of the transaction is really
     * this one who do it :)
     * using the signature and and the public key of the user we should have at the end
     * the same data tthat was signed at first
     *
     */
    this.verify = (signature, publicKey, data) => {
        let rsaDecryptor = new chilkat.Rsa();
        rsaDecryptor.EncodingMode = "hex";
        success = rsaDecryptor.ImportPublicKey(publicKey);
        usePrivateKey = false;
        return   rsaDecryptor.DecryptStringENC(signature,usePrivateKey )== data;
    };

    /**
     * ¨
     * Use this function to create a transaction
     * This coming from the current user to another
     * @param value
     * @param to
     * @return {TransactionClasse}
     */
    this.createTransaction = (value, to) => {
        return new Transaction(this.publicKey, to, value, this.sign(value), 'paye');
    }
};

module.exports =  UserClasse;
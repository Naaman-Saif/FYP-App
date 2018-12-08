const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    email: { type: String, unique: true },
    accounts:{type:Array,default:[
        {name:'Other',color:'chartPalette.yellow500'},
        {name:'Cash',color:'chartPalette.purple500'},
        {name:'Creadit Card',color:'chartPalette.lightBlue500'}
    ]},
    initialBalance:{type:Number,default:0},
    initialDate:Date
});

module.exports = mongoose.model('Wallet',WalletSchema);
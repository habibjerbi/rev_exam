const mongoose = require('mongoose');
const schema =mongoose.Schema;
const produitSchema = mongoose.Schema({
    libelle:{type:String , required:true},
    prix:{type:Number , required:true},
    description:{type:String , required:true},
    quantite:{type:Number , required:true},
    instock:{type:Boolean , required:true},
}, {timestamps:true});
module.exports=mongoose.model("produit",produitSchema);
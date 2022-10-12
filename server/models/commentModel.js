const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    product_id:{
        type:String,
        required:true,
        ref:"products"
    },
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    content:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        default:0,
    },
    reply:{
        type:Array,
    },
},{
    timestamps:true

    
    
})
module.exports = mongoose.model("Comments",commentSchema)
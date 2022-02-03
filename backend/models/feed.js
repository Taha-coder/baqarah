const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const feedSchema=new Schema({
    name: {
        type: String,
        required: [true, 'Please enter feed name']
    },
    price:{
        type: Number,
        required: [true, 'Please enter feed price'],
        maxLength: [20, 'Feed price cannot exceed 20 characters'],
        default: 0.0
    },
    type:{
        type: String,
        required: [true,'Please select type for this feed'],
        enum:{
            values:[
                'Bhussa',
                'chokr', 
                'double roti',
                'khal', 
                'kutti'
            ],
            message: 'Please select correct type for feed'
        }
    },
    quantity: {
        type: Number,
        required: [true, 'Please enter feed quantity in kilos'],
        default: 0
    },
    supplier: {
        type: String,
        required: [true, 'Please enter feed supplier']
    },
    expiryDate: {
        type: String,
        required: [true, 'Please enter feed expiry date']
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});



const model=mongoose.model("Feed",feedSchema);
module.exports=model;
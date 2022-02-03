const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const productSchema=new Schema({
    name:{
        type: String,
        required: [true, 'Please enter product name'],
    },
    price:{
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [20, 'Product price cannot exceed 20 characters'],
        default: 0.0
    },
    weight:{
        type: String,
        required: [true, 'Please enter product weight'],
    },
    race:{
        type: String,
        required: [true, 'Please enter product race'],
        enum:{
            values:[
                'sahiwal',
                'cholistani',
                'dajal',
                'dhanni',
                'rojhan',
                'brahman',
                'sibbi'
            ],
            message: 'Please select correct race for product'
        }
    },
    teeth:{
        type: Number,
        required: [true, 'Please enter product teeth'],
        default: 0
    },
    age:{
        type: String,
        required: [true, 'Please enter product age'],
    },
    color:{
        type: String,
        required: [true, 'Please enter product color'],
    },
    gender:{
        type: String,
        required: [true, 'Please enter product gender'],
    },
    vaccinated:{
        type: String,
        required: [true, 'Please enter product vaccinated'],
    },
    
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true,'Please select category for this product'],
        enum:{
            values:[
                'Cows',
                'Goats',
                'Camels',
                'Sheeps'
            ],
            message: 'Please select correct category for product'
        }
    },
    stock:{
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [1, 'Product stock cannot exceed 1 character'],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
        
            },
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type:String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true

    },
    createdAt:{
        type: Date,
        default: Date.now
    }

});



const model=mongoose.model("Product",productSchema);
module.exports=model;
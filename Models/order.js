const mongoose = require('mongoose');

const OrderSchema = new Mongoose.Schema(
    {
        userId: { typeof: 'string' , required: true},
        products: [
            {
                productsId: {
                    typeof: 'string',
                },
                quantity:{
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
        status: { type: String, default:"pending"},
    },
    { timstamps: true }
);
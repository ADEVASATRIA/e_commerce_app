const mongoose = require('mongoose');

const CartSchema = new Mongoose.Schema(
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
    },
    { timstamps: true }
);
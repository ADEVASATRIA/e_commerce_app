const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
        userId: { type: 'string' , required: true},
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

module.exports = mongoose.model("Cart", CartSchema);
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
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
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
        status: { type: String, default:"pending"},
    },
    { timstamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
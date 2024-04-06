const OrderSchema = require('../models/OrderDTO');

const addNewOrder = async (req, res, next) => {
    try {
        const { sandwichId, status } = req.body;

        const order = new OrderSchema({
            sandwichId,
            status
        });

        const savedOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {addNewOrder}

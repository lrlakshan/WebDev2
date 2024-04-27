const OrderSchema = require("../models/order");
const { addTask } = require("../rabbit-utils/sendTask");
const { rabbitHost, queue1 } = require("../config");

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - sandwichId
 *       properties:
 *         sandwichId:
 *           type: string
 *           description: ID of the sandwich
 *         status:
 *           type: string
 *           enum: [ordered, received, inQueue, ready, failed]
 *           description: Status of the order
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

// Add a new order
/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Add a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               sandwichId:
 *                 type: string
 *                 description: ID of the sandwich
 *               status:
 *                 type: string
 *                 enum: 
 *                   - ordered
 *                   - received
 *                   - inQueue
 *                   - ready
 *                   - failed
 *                 description: Status of the order
 *     responses:
 *       201:
 *         description: Successfully created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 *     example:
 *       requestBody:
 *         content:
 *           application/x-www-form-urlencoded:
 *             schema:
 *               type: object
 *               properties:
 *                 sandwichId:
 *                   type: string
 *                   example: 123
 *                 status:
 *                   type: string
 *                   enum:
 *                     - ordered
 *                     - received
 *                     - inQueue
 *                     - ready
 *                     - failed
 *                   example: ordered
 */

const addNewOrder = async (req, res, next) => {
  try {
    const { sandwichId, status } = req.body;

    // Creating a new order instance
    const order = new OrderSchema({
      sandwichId,
      status,
    });

    const savedOrder = await order.save();
    addTask(rabbitHost, queue1, savedOrder); // Send the order to the RabbitMQ work queue
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error
 */
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderSchema.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get specific order by order id
/**
 * @swagger
 * /api/v1/order/{orderId}:
 *   get:
 *     summary: Get a specific order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
const getOrderByID = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await OrderSchema.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await OrderSchema.findByIdAndUpdate(orderId, { status: status }, { new: true });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { addNewOrder, getAllOrders, getOrderByID, updateOrderStatus }; // Exporting controller functions for use in routes

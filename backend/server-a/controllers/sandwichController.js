const Sandwich = require("../models/sandwich");

/**
 * @swagger
 * components:
 *   schemas:
 *     Sandwich:
 *       type: object
 *       required:
 *         - name
 *         - toppings
 *         - breadType
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the sandwich
 *         toppings:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the topping
 *           description: List of toppings
 *         breadType:
 *           type: string
 *           description: Type of bread
 */

/**
 * @swagger
 * tags:
 *   name: Sandwiches
 *   description: API endpoints for managing sandwiches
 */

/**
 * @swagger
 * /api/v1/sandwich:
 *   post:
 *     summary: Create a new sandwich
 *     tags: [Sandwiches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sandwich'
 *     responses:
 *       201:
 *         description: Successfully created sandwich
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sandwich'
 *             example:
 *               id: 1
 *               name: my-sandwich
 *               toppings:
 *                 - id: 1
 *                   name: lettuce
 *               breadType: whole grain
 *       500:
 *         description: Internal server error
 */

const saveSandwich = async (req, res, next) => {
  try {
    const { name, toppings, breadType } = req.body;
    // Creating a new sandwich instance without the `id` property
    const sandwich = new Sandwich({
      name,
      toppings,
      breadType,
    });
    // Saving the sandwich to the database
    const savedSandwich = await sandwich.save();
    res.status(201).json(savedSandwich);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /api/v1/sandwich:
 *   get:
 *     summary: Get all sandwiches
 *     tags: [Sandwiches]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: A list of sandwiches
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Sandwich'
 *       500:
 *         description: Internal server error
 */
const getAllSandwiches = async (req, res) => {
  try {
    const sandwich = await Sandwich.find();
    if (!sandwich) {
      return res.status(404).json({ message: "Sandwich not found" });
    }
    res.status(200).json(sandwich);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * @swagger
 * /api/v1/sandwich/{sandwichId}:
 *   get:
 *     summary: Get a specific sandwich by ID
 *     tags: [Sandwiches]
 *     parameters:
 *       - in: path
 *         name: sandwichId
 *         required: true
 *         type: string
 *         description: ID of the sandwich to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved sandwich
 *         schema:
 *           $ref: '#/components/schemas/Sandwich'
 *       404:
 *         description: Sandwich not found
 *       500:
 *         description: Internal server error
 */

const getSandwichByID = async (req, res) => {
  try {
    const sandwichId = req.params.id;
    const sandwich = await Sandwich.findById(sandwichId);
    if (!sandwich) {
      return res.status(404).json({ message: "Sandwich not found" });
    }
    res.status(200).json(sandwich);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * @swagger
 * /api/v1/sandwich/{sandwichId}:
 *   put:
 *     summary: Update a sandwich by ID
 *     tags: [Sandwiches]
 *     parameters:
 *       - in: path
 *         name: sandwichId
 *         required: true
 *         type: string
 *         description: ID of the sandwich to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sandwich'
 *     responses:
 *       200:
 *         description: Successfully updated sandwich
 *         schema:
 *           $ref: '#/components/schemas/Sandwich'
 *       404:
 *         description: Sandwich not found
 *       500:
 *         description: Internal server error
 */

const updateSandwich = async (req, res) => {
  try {
    const sandwichId = req.params.id; // Extract sandwich ID from route parameters
    const updates = req.body; // Extract updates from request body
    const updatedSandwich = await Sandwich.findByIdAndUpdate(
      sandwichId,
      updates,
      { new: true }
    );
    if (!updatedSandwich) {
      return res.status(404).json({ message: "Sandwich not found" });
    }

    res.status(200).json(updatedSandwich);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
/**
 * @swagger
 * /api/v1/sandwich/{sandwichId}:
 *   delete:
 *     summary: Delete a sandwich by ID
 *     tags: [Sandwiches]
 *     parameters:
 *       - in: path
 *         name: sandwichId
 *         required: true
 *         type: string
 *         description: ID of the sandwich to delete
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Sandwich not found
 *       500:
 *         description: Internal server error
 */
const deleteSandwich = async (req, res) => {
  try {
    const sandwichId = req.params.id; // Extract sandwich ID from route parameters

    // Delete the sandwich by ID
    const deletedSandwich = await Sandwich.findByIdAndDelete(sandwichId);

    if (!deletedSandwich) {
      return res.status(404).json({ message: "Sandwich not found" });
    }

    res.status(200).json({ message: "Sandwich deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  saveSandwich,
  getAllSandwiches,
  getSandwichByID,
  updateSandwich,
  deleteSandwich,
};

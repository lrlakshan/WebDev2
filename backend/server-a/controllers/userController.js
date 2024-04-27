const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { signToken } = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         username: john_doe
 *         password: Password123
 */

/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 username:
 *                   type: string
 *                 userType:
 *                   type: string
 *       400:
 *         description: Bad Request
 */
const register = async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    // username admin is reserved
    if (existingUser || username === "admin") {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // New users only can be registered as customers
    const userType = "customer";

    // Create new user
    const userToDB = new User({ username: username, password: hashedPassword, userType: userType });

    // Save user to database
    await userToDB.save();

    const user = { username, userType: "customer" };

    const accessToken = signToken(user, { expiresIn: "1h" });

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
    });

    res.status(201).json({ message: 'User created successfully', username: user.username, userType: user.userType });
};

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 username:
 *                   type: string
 *                 userType:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  let user;

  if (username === "admin") {

    if (password !== "password") {
        return res.status(401).json({ message: "Incorrect password" });
    }

    user = { username, userType: "admin" };
  } else {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Check if provided password matches stored password
    const isMatch = bcrypt.compareSync(password, userFound.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    user = { username, userType: "customer" };
  }

  const accessToken = signToken(user, { expiresIn: "1h" });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({ message: 'User logged in successfully', username: user.username, userType: user.userType });
};

/**
 * @swagger
 * /api/v1/user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
const logout = (req, res) => {
    res.clearCookie('access_token');

    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = { login, register, logout };

const jwt = require("jsonwebtoken");
const secretKey = "2nGxLWSL0#nVKCsV#QSLlQ7JMaV&djLT"; // We know that this should be added to the .env file. But for the sake of simplicity, we are keeping it here.

/**
 * Middleware to authenticate an admin user.
 * It verifies the JWT token and checks if the user type is 'admin'.
 * If the token is valid and the user type is 'admin', it adds the decoded token to the request object and calls the next middleware.
 * If the token is invalid or the user type is not 'admin', it sends a 401 or 403 response.
 */
const authenticateAdmin = (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken.userType !== "admin") {
      return res.status(403).json({ message: "Access forbidden" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Middleware to authenticate a customer user.
 * It verifies the JWT token and checks if the user type is 'customer'.
 * If the token is valid and the user type is 'customer', it adds the decoded token to the request object and calls the next middleware.
 * If the token is invalid or the user type is not 'customer', it sends a 401 or 403 response.
 */
const authenticateCustomer = (req, res, next) => {
  const token = req.cookies["access_token"];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken.userType !== "customer") {
      return res.status(403).json({ message: "Access forbidden" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * Middleware to authenticate both admin and customer users.
 * It verifies the JWT token and checks if the user type is either 'admin' or 'customer'.
 * If the token is valid and the user type is either 'admin' or 'customer', it adds the decoded token to the request object and calls the next middleware.
 * If the token is invalid or the user type is neither 'admin' nor 'customer', it sends a 401 or 403 response.
 */
const authenticateBoth = (req, res, next) => {
    const token = req.cookies["access_token"];

    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        if (decodedToken.userType !== "admin" && decodedToken.userType !== "customer") {
            return res.status(403).json({ message: "Access forbidden" });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

/**
 * Function to sign a JWT token.
 * It takes a payload and options as arguments and returns a signed JWT token.
 * The payload is the data that you want to include in the token.
 * The options is an object that can include options like the token's expiration time.
 */
const signToken = (payload, options) => {
  return jwt.sign(payload, secretKey, options);
};

module.exports = { authenticateAdmin, authenticateCustomer, authenticateBoth, signToken };

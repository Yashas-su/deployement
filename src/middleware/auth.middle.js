const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);

    const token = authHeader?.split(" ")[1]; // ✅ defined here
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.jwt_key);

    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.name, err.message);
    return res.status(401).json({ message: err.message });
  }
};

module.exports = authMiddleware;
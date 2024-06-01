// middleware/auth.middleware.js
import "dotenv/config";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: payload.user_id,
      email: payload.email,
      rol: payload.rol,
    };

    next();
  } catch (error) {
    console.log("Token verification error:", error);
    return res.status(404).json({ error: "Invalid token" });
  }
};

// isAdmin middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === "admin") {
    next(); // Allow access to the next middleware or route handler
  } else {
    return res
      .status(403)
      .json({ error: "Access denied. Only admins are allowed." });
  }
};

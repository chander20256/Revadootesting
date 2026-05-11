const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

/* -----------------------------
   CONFIG
----------------------------- */
const INACTIVITY_LIMIT = 24 * 60 * 60 * 1000; // 24 hours

/* -----------------------------
   PROTECT ROUTE
----------------------------- */

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please login again.",
      });
    }

    /* -----------------------------
       STATUS CHECK
    ----------------------------- */
    if (user.status !== "active") {
      return res.status(403).json({
        message: "Account inactive or banned.",
      });
    }

    /* -----------------------------
       INACTIVITY CHECK (24h)
    ----------------------------- */
    const lastActivity = user.lastActiveAt || user.lastLoginAt;

    if (lastActivity) {
      const diff = Date.now() - new Date(lastActivity).getTime();

      if (diff > INACTIVITY_LIMIT) {
        return res.status(401).json({
          message: "Session expired due to inactivity. Please login again.",
        });
      }
    }

    /* -----------------------------
       UPDATE LAST ACTIVE
    ----------------------------- */
    user.lastActiveAt = new Date();
    await user.save();

    req.user = user;
    req.auth = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};

/* -----------------------------
   ADMIN CHECK
----------------------------- */

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required.",
    });
  }
  next();
};

module.exports = {
  protect,
  requireAdmin,
};
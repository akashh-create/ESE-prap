import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Access denied. Token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "development_secret");
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Access denied. User not found." });
    }

    req.user = user;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Access denied. Invalid token." });
  }
}

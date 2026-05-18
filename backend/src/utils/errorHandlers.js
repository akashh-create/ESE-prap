export function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  const statusCode = error.statusCode || 500;

  if (error.code === 11000) {
    return res.status(409).json({ message: "Email already exists" });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: Object.values(error.errors).map((item) => item.message).join(", ")
    });
  }

  return res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
}

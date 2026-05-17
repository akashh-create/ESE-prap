import cors from "cors";
import express from "express";
import morgan from "morgan";
import candidateRoutes from "./routes/candidateRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import shortlistRoutes from "./routes/shortlistRoutes.js";
import { errorHandler, notFoundHandler } from "./utils/errorHandlers.js";

const app = express();

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "candidate-shortlisting-api" });
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/shortlists", shortlistRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

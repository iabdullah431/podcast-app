import express from "express";
import cors from "cors";
import searchRoute from "../src/routes/search.route.vercel";

const app = express();
app.use(cors());
app.use(express.json());

// Vercel adds /api automatically, so routes are relative
app.use("/search", searchRoute);

// Health check
app.get("/", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;

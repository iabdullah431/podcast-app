import express from "express";
import cors from "cors";
import searchRoute from "../src/routes/search.route.vercel";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoute);

// Health check
app.get("/api", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;

import express from "express";
import cors from "cors";
import searchRoute from "./routes/search.route";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/search", searchRoute);

app.listen(process.env.PORT || 3001, () => {
  console.log("✅ Backend API running on port " + (process.env.PORT || 3001));
});

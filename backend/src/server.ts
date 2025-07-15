import express from "express";
import cors from "cors";
import searchRoute from "./routes/search.route";

const app = express();
app.use(cors());

const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/search", searchRoute);

app.listen(port, () => {
  console.log(`✅ Backend API running on port ${port}`);
});

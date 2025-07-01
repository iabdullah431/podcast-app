import express from "express";
import cors from "cors";
import searchRoute from "./routes/search.route";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/search", searchRoute);

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});

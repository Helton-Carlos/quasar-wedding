import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/index.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Connect system: ${PORT}`);
});

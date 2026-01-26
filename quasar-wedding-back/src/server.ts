import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(cors());

app.listen(() => {
  console.log(`Connect system: ${PORT}`);
});

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/connectdb.js";
import commonRoutes from "./routes/commonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orgRoutes from "./routes/orgRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import devRoutes from "./routes/devRoutes.js";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// CORS Policy
app.use(cors({ origin: '*' }));

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.send("working");
});

app.use("/dev", devRoutes);
app.use("/api", commonRoutes);
app.use("/auth", authRoutes);
app.use("/org", orgRoutes);
app.use("/client", clientRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

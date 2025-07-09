import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDb from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ProfileRoutes from "./routes/profileRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowOrigin = [
  "https://mentorship-frontend-phi.vercel.app/",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
    methods: ["GET", "PUT", "DELETE", "pOST"],
    allowedHeaders: ["content-type", "Authorization"],
  })
);

app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
// connecting to database

app.get("/", (req, res) => {
  res.json({ message: "welcome to backend" });
});
connectDb();
app.listen(8000, () => {
  console.log("Server is running on Port 8000");
});

import express from "express";
import AuthRoute from "./routes/auth.js";
import TodoRoute from "./routes/todo.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const PORT = 3000;

app.use(cors({credentials: true, 
    origin: ['http://localhost:5173', "http://127.0.0.1:5173"]
}))

dotenv.config();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/user", AuthRoute);
app.use("/api/todos", TodoRoute);

app.get("/", (req, res, next) => {
    res.send("hello world");
});

// global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
    console.log(`listeining on port: ${PORT}`);
});

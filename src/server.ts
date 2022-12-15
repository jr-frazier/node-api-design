import express, { application, ErrorRequestHandler } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.status(200);
  res.json({ message: "hello there" });
});

app.use("/api", protect, router);

app.post("/signin", signin);
app.post("/signup", createNewUser);

// This is the error handler function that is needed for express to handle errors and to keep Typescript happy or it will cry like a baby
// This will catch all unhandled errors and return a 500 status code
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500);
  res.json({ message: "internal server error" });
};

// Handles unhandled errors
app.use(errorHandler);

export default app;

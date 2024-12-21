import express from "express";
import config from "config";
import "./utils/dbConnect.js";
import userRouter from "./controllers/users/index.js";
import postsRouter from "./controllers/posts/index.js";
import storiesRouter from "./controllers/stories/index.js";

const app = express();
const PORT = config.get("PORT");

app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.status(200).json({ msg: "Hello World ‼️" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

app.use("/api/stories", storiesRouter);
app.use("/api/posts", postsRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});

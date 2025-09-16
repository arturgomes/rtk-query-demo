import cors from "cors";
import express from "express";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log(`API server running on http://localhost:${PORT}`);
});

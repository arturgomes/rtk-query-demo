import cors from "cors";
import express from "express";
import { type Post, posts, resetPosts } from "./posts";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let nextId = 11;

app.get("/posts", (_req, res) => {
	res.json(posts);
});

app.get("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const post = posts.find((p) => p.id === id);

	if (!post) {
		return res.status(404).json({ error: "Post not found" });
	}

	res.json(post);
});

app.post("/posts", (req, res) => {
	const { title, body, userId } = req.body;

	if (!title || !body || !userId) {
		return res
			.status(400)
			.json({ error: "title, body, and userId are required" });
	}

	const newPost: Post = {
		id: nextId++,
		title,
		body,
		userId,
	};

	posts.push(newPost);
	res.status(201).json(newPost);
});

app.patch("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const postIndex = posts.findIndex((p) => p.id === id);

	if (postIndex === -1) {
		return res.status(404).json({ error: "Post not found" });
	}

	const { title, body } = req.body;
	const updatedPost = {
		...posts[postIndex],
		...(title && { title }),
		...(body && { body }),
	};

	posts[postIndex] = updatedPost;
	res.json(updatedPost);
});

app.delete("/posts/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const postIndex = posts.findIndex((p) => p.id === id);

	if (postIndex === -1) {
		return res.status(404).json({ error: "Post not found" });
	}

	posts.splice(postIndex, 1);
	res.status(204).send();
});

app.post("/posts/reset", (_req, res) => {
	const resetData = resetPosts();
	nextId = 11; // Reset nextId to original value
	res.json({ message: "Posts reset to original state", posts: resetData });
});

app.listen(PORT, () => {
	console.log(`API server running on http://localhost:${PORT}`);
});

import { Router } from "express";
import { ObjectId } from "bson";
import { type Post, posts, resetPosts } from "../posts";

const router = Router();

router.get("/", (_req, res) => {
	res.json(posts);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const post = posts.find((p) => p.id === id);

	if (!post) {
		return res.status(404).json({ error: "Post not found" });
	}

	res.json(post);
});

router.post("/", (req, res) => {
	const { title, body, userId } = req.body;

	if (!title || !body || !userId) {
		return res
			.status(400)
			.json({ error: "title, body, and userId are required" });
	}

	const newPost: Post = {
		id: new ObjectId().toHexString(),
		title,
		body,
		userId,
	};

	posts.push(newPost);
	res.status(201).json(newPost);
});

router.patch("/:id", (req, res) => {
	const id = req.params.id;
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

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	const postIndex = posts.findIndex((p) => p.id === id);

	if (postIndex === -1) {
		return res.status(404).json({ error: "Post not found" });
	}

	posts.splice(postIndex, 1);
	res.status(204).send();
});

router.post("/reset", (_req, res) => {
	const resetData = resetPosts();
	res.json({ message: "Posts reset to original state", posts: resetData });
});

export default router;
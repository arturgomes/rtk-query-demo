import { Router } from "express";
import { users } from "../users";
import { posts } from "../posts";

const router = Router();

router.get("/", (_req, res) => {
	res.json(users);
});

router.get("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const user = users.find((u) => u.id === id);

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.json(user);
});

router.get("/:id/posts", (req, res) => {
	const userId = parseInt(req.params.id);
	const user = users.find((u) => u.id === userId);

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	const userPosts = posts.filter((p) => p.userId === userId);
	res.json(userPosts);
});

export default router;
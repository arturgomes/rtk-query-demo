import { Router } from "express";
import { users, addUser } from "../users";
import { posts } from "../posts";

const router = Router();

router.get("/", (_req, res) => {
	res.json(users);
});

router.get("/:id", (req, res) => {
	const id = req.params.id;
	const user = users.find((u) => u.id === id);

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.json(user);
});

router.get("/:id/posts", (req, res) => {
	const userId = req.params.id;
	const user = users.find((u) => u.id === userId);

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	const userPosts = posts.filter((p) => p.userId === userId);
	res.json(userPosts);
});

router.post("/", (req, res) => {
	const { name, email, username } = req.body;

	if (!name || !email || !username) {
		return res.status(400).json({ error: "Name, email, and username are required" });
	}

	const newUser = addUser({ name, email, username });
	res.status(201).json(newUser);
});

export default router;
// src/components/NewPostForm.tsx
import { useState } from "react";
import { useAddPostMutation } from "../store/api/postsApi";

interface NewPostFormProps {
	onPostAdded: () => void;
}

const NewPostForm = ({ onPostAdded }: NewPostFormProps) => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [addPost, { isLoading }] = useAddPostMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (title && body) {
			await addPost({
				title,
				body,
				userId: 1, // In a real app, you'd use the actual user ID
			});
			setTitle("");
			setBody("");
			onPostAdded();
		}
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>
			<form onSubmit={handleSubmit} className="max-w-2xl">
				<div className="mb-4">
					<label
						htmlFor="new-title"
						className="block text-gray-700 font-medium mb-2"
					>
						Title:
					</label>
					<input
						id="new-title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						disabled={isLoading}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="new-body"
						className="block text-gray-700 font-medium mb-2"
					>
						Content:
					</label>
					<textarea
						id="new-body"
						value={body}
						onChange={(e) => setBody(e.target.value)}
						disabled={isLoading}
						rows={6}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="flex justify-between">
					<button
						type="button"
						onClick={onPostAdded}
						className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isLoading || !title || !body}
						className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
					>
						{isLoading ? "Creating..." : "Create Post"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewPostForm;

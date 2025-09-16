// src/components/PostDetail.tsx
import { useState } from "react";
import {
	useDeletePostMutation,
	useGetPostByIdQuery,
	useGetUserByIdQuery,
	useUpdatePostMutation,
} from "../store/api/postsApi";

interface PostDetailProps {
	postId: number;
	onBack: () => void;
}

const PostDetail = ({ postId, onBack }: PostDetailProps) => {
	const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
	const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(post?.userId || "", {
		skip: !post?.userId,
	});
	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");

	// Initialize edit form when post data is loaded
	if (post && title === "" && body === "") {
		setTitle(post.title);
		setBody(post.body);
	}

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		if (post) {
			await updatePost({ id: post.id, title, body });
			setIsEditing(false);
		}
	};

	const handleDelete = async () => {
		if (post) {
			await deletePost(post.id);
			onBack();
		}
	};

	if (isLoading || isUserLoading)
		return (
			<div className="flex justify-center py-8">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);

	if (isError)
		return (
			<div className="bg-red-100 text-red-700 p-4 rounded-lg">
				Error loading post
			</div>
		);

	if (!post)
		return (
			<div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
				Post not found
			</div>
		);

	return (
		<div>
			<button
				type="button"
				onClick={onBack}
				className="flex items-center text-blue-500 hover:text-blue-700 mb-6"
			>
				<svg
					aria-label="Back to posts"
					className="w-5 h-5 mr-1"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title>Back to posts</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M15 19l-7-7 7-7"
					></path>
				</svg>
				Back to posts
			</button>

			{isEditing ? (
				<div className="bg-gray-50 p-6 rounded-lg">
					<h2 className="text-xl font-bold text-gray-800 mb-4">Edit Post</h2>
					<div className="mb-4">
						<label
							htmlFor="title"
							className="block text-gray-700 font-medium mb-2"
						>
							Title:
						</label>
						<input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							disabled={isUpdating}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="body"
							className="block text-gray-700 font-medium mb-2"
						>
							Content:
						</label>
						<textarea
							id="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
							disabled={isUpdating}
							rows={6}
							className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex justify-end space-x-3">
						<button
							type="button"
							onClick={() => setIsEditing(false)}
							disabled={isUpdating}
							className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleSave}
							disabled={isUpdating}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
						>
							{isUpdating ? "Saving..." : "Save Changes"}
						</button>
					</div>
				</div>
			) : (
				<div className="bg-white rounded-lg">
					<h2 className="text-2xl font-bold text-gray-800 mb-4">
						{post.title}
					</h2>
					<div className="mb-4 text-sm text-gray-600 space-y-1">
						{user && (
							<div>
								By: <span className="font-medium text-gray-800">{user.name}</span>
							</div>
						)}
						<div>
							Created: <span className="font-medium text-gray-800">{new Date(post.createdAt).toLocaleDateString()}</span>
						</div>
					</div>
					<p className="text-gray-700 mb-6 whitespace-pre-line">{post.body}</p>
					<div className="flex space-x-3">
						<button
							type="button"
							onClick={handleEdit}
							className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						>
							Edit
						</button>
						<button
							type="button"
							onClick={handleDelete}
							disabled={isDeleting}
							className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300"
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetail;

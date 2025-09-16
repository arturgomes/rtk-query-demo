// src/components/PostDetail.tsx
import { useState } from "react";
import {
	useDeletePostMutation,
	useGetPostByIdQuery,
	useGetUserByIdQuery,
	useUpdatePostMutation,
} from "../store/api/postsApi";
import {
	BackButton,
	CancelButton,
	DeleteButton,
	EditButton,
	SaveButton,
} from "./ui";

interface PostDetailProps {
	postId: string;
	onBack: () => void;
}

const PostDetail = ({ postId, onBack }: PostDetailProps) => {
	const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
	const { data: user, isLoading: isUserLoading } = useGetUserByIdQuery(
		post?.userId || "",
		{
			skip: !post?.userId,
		},
	);
	const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
	const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(post?.title || "");
	const [body, setBody] = useState(post?.body || "");

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
			<BackButton onClick={onBack} className="mb-6" />

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
						<CancelButton
							onClick={() => setIsEditing(false)}
							disabled={isUpdating}
						/>
						<SaveButton onClick={handleSave} isSaving={isUpdating} />
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
								By:{" "}
								<span className="font-medium text-gray-800">{user.name}</span>
							</div>
						)}
						<div>
							Created:{" "}
							<span className="font-medium text-gray-800">
								{new Date(post.createdAt).toLocaleDateString()}
							</span>
						</div>
					</div>
					<p className="text-gray-700 mb-6 whitespace-pre-line">{post.body}</p>
					<div className="flex space-x-3">
						<EditButton onClick={handleEdit} />
						<DeleteButton onClick={handleDelete} isDeleting={isDeleting} />
					</div>
				</div>
			)}
		</div>
	);
};

export default PostDetail;

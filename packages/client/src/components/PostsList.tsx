// src/components/PostsList.tsx
import { useDeletePostMutation, useGetPostsQuery, useResetPostsMutation } from "../store/api/postsApi";

interface PostsListProps {
	onSelectPost: (postId: number) => void;
	onNewPost: () => void;
}

const PostsList = ({ onSelectPost, onNewPost }: PostsListProps) => {
	const { data: posts, isLoading, isError, error } = useGetPostsQuery();
	const [deletePost] = useDeletePostMutation();
	const [resetPosts, { isLoading: isResetting }] = useResetPostsMutation();

	if (isLoading) {
		return (
			<div className="flex justify-center py-8">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-red-100 text-red-700 p-4 rounded-lg">
				Error: {(error as any).message}
			</div>
		);
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Posts</h1>
				<div className="flex space-x-3">
					<button
						type="button"
						onClick={() => resetPosts()}
						disabled={isResetting}
						className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg flex items-center"
					>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Reset posts</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							></path>
						</svg>
						{isResetting ? "Resetting..." : "Reset"}
					</button>
					<button
						type="button"
						onClick={onNewPost}
						className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
					>
						<svg
							className="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>New post</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 4v16m8-8H4"
							></path>
						</svg>
						New Post
					</button>
				</div>
			</div>

			<ul className="divide-y divide-gray-200">
				{posts?.map((post) => (
					<li key={post.id} className="py-4">
						<div className="flex justify-between group">
							<button
								type="button"
								className="flex-1 cursor-pointer group-hover:bg-gray-50 p-3 rounded-lg transition text-left w-full"
								onClick={() => onSelectPost(post.id)}
							>
								<h3 className="text-lg font-medium text-gray-800 mb-2">
									{post.title}
								</h3>
								<p className="text-gray-600">
									{post.body.substring(0, 100)}...
								</p>
							</button>
							<button
								type="button"
								className="ml-4 text-red-500 hover:text-red-700 self-start p-2"
								onClick={(e) => {
									e.stopPropagation();
									deletePost(post.id);
								}}
							>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Delete post</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									></path>
								</svg>
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PostsList;

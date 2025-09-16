interface PostsListHeaderProps {
	onNewPost: () => void;
	onReset: () => void;
	isResetting: boolean;
}

const PostsListHeader = ({ onNewPost, onReset, isResetting }: PostsListHeaderProps) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<h1 className="text-2xl font-bold text-gray-800">Posts</h1>
			<div className="flex space-x-3">
				<button
					type="button"
					onClick={onReset}
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
	);
};

export default PostsListHeader;
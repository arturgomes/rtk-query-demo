import type { Post } from "../store/api/postsApi";

interface PostsListItemProps {
	post: Post;
	getUserName: (userId: string) => string;
	onSelectPost: (postId: number) => void;
	onDeletePost: (postId: string) => void;
}

const PostsListItem = ({
	post,
	getUserName,
	onSelectPost,
	onDeletePost,
}: PostsListItemProps) => {
	return (
		<li className="py-4">
			<div className="flex justify-between group">
				<button
					type="button"
					className="flex-1 cursor-pointer group-hover:bg-gray-50 p-3 rounded-lg transition text-left w-full"
					onClick={() => onSelectPost(Number(post.id))}
				>
					<h3 className="text-lg font-medium text-gray-800 mb-2">
						{post.title}
					</h3>
					<div className="text-sm text-gray-500 mb-2 space-y-1">
						<div>By: {getUserName(post.userId)}</div>
						<div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
					</div>
					<p className="text-gray-600">{post.body.substring(0, 100)}...</p>
				</button>
				<button
					type="button"
					className="ml-4 text-red-500 hover:text-red-700 self-start p-2"
					onClick={(e) => {
						e.stopPropagation();
						onDeletePost(post.id);
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
	);
};

export default PostsListItem;
};

export default PostsListItem;

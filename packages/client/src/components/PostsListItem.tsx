import type { Post } from "../store/api/postsApi";
import { PostItemButton, IconButton } from "./ui";
import { TrashIcon } from "./ui/icons";

interface PostsListItemProps {
	post: Post;
	getUserName: (userId: string) => string;
	onSelectPost: (postId: string) => void;
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
				<PostItemButton
					onClick={() => onSelectPost(post.id)}
				>
					<div>
						<h3 className="text-lg font-medium text-gray-800 mb-2">
							{post.title}
						</h3>
						<div className="text-sm text-gray-500 mb-2 space-y-1">
							<div>By: {getUserName(post.userId)}</div>
							<div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
						</div>
						<p className="text-gray-600">{post.body.substring(0, 100)}...</p>
					</div>
				</PostItemButton>
				<IconButton
					className="ml-4 text-red-500 hover:text-red-700 self-start"
					icon={<TrashIcon className="w-5 h-5" />}
					aria-label="Delete post"
					onClick={(e) => {
						e.stopPropagation();
						onDeletePost(post.id);
					}}
				/>
			</div>
		</li>
	);
};

export default PostsListItem;

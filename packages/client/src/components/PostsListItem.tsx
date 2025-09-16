import type { Post } from "../store/api/postsApi";
import {
	useDownvotePostMutation,
	useGetPostVotesQuery,
	useUpvotePostMutation,
} from "../store/api/postsApi";
import { IconButton, PostItemButton } from "./ui";
import { DownvoteIcon, UpvoteIcon } from "./ui/icons";

interface PostsListItemProps {
	post: Post;
	getUserName: (userId: string) => string;
	onSelectPost: (postId: string) => void;
}

const PostsListItem = ({
	post,
	getUserName,
	onSelectPost,
}: PostsListItemProps) => {
	const { data: votesData } = useGetPostVotesQuery(post.id);

	const [upvotePost, { isLoading: isUpvoting }] = useUpvotePostMutation();
	const [downvotePost, { isLoading: isDownvoting }] = useDownvotePostMutation();

	const _upvotess = post.upvotes ?? votesData?.upvotes ?? 0;
	const _downvotess = post.downvotes ?? votesData?.downvotes ?? 0;
	const voteScore = post.voteScore ?? votesData?.voteScore ?? 0;
	const isLoading = isUpvoting || isDownvoting;

	const handleUpvoteClick = async (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isLoading) return;

		try {
			await upvotePost(post.id);
		} catch (error) {
			console.error("Error upvoting post:", error);
		}
	};

	const handleDownvoteClick = async (e: React.MouseEvent) => {
		e.stopPropagation();

		if (isLoading) return;

		try {
			await downvotePost(post.id);
		} catch (error) {
			console.error("Error downvoting post:", error);
		}
	};

	return (
		<li className="py-4">
			<div className="flex justify-between group">
				<PostItemButton onClick={() => onSelectPost(post.id)}>
					<div>
						<h3 className="text-lg font-medium text-gray-800 mb-2">
							{post.title}
						</h3>
						<div className="text-sm text-gray-500 mb-2 space-y-1">
							<div>By: {getUserName(post.userId)}</div>
							<div>
								Created: {new Date(post.createdAt).toLocaleDateString()}
							</div>
						</div>
						<p className="text-gray-600">{post.body.substring(0, 100)}...</p>
					</div>
				</PostItemButton>
				<div className="ml-4 self-start flex flex-col items-center gap-1">
					<IconButton
						className={`transition-colors text-green-500 hover:text-green-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
						icon={<UpvoteIcon className="w-5 h-5" />}
						aria-label="Upvote post"
						onClick={handleUpvoteClick}
						disabled={isLoading}
					/>
					<span className="text-sm text-gray-600 font-medium min-w-[2rem] text-center">
						{voteScore}
					</span>
					<IconButton
						className={`transition-colors text-red-500 hover:text-red-600 ${isLoading || voteScore <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
						icon={<DownvoteIcon className="w-5 h-5" />}
						aria-label="Downvote post"
						onClick={handleDownvoteClick}
						disabled={isLoading || voteScore <= 0}
					/>
				</div>
			</div>
		</li>
	);
};

export default PostsListItem;

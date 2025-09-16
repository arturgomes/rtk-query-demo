import type { Post } from "../store/api/postsApi";
import {
	useDownvotePostMutation,
	useGetPostVotesQuery,
	useUpvotePostMutation,
} from "../store/api/postsApi";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui";
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
		<Card className="group transition-all hover:shadow-lg mb-4 overflow-hidden">
			<div className="flex min-h-[120px]">
				{/* Main content area - clickable */}
				<button
					type="button"
					className="flex-1 text-left hover:bg-gray-50 transition-colors focus:bg-gray-50 focus:outline-none"
					onClick={() => onSelectPost(post.id)}
				>
					<CardHeader className="pb-3">
						<CardTitle className="mb-2 group-hover:text-blue-600 transition-colors">
							{post.title}
						</CardTitle>
						<div className="flex items-center gap-4 text-sm text-gray-500">
							<span>By: {getUserName(post.userId)}</span>
							<span>{new Date(post.createdAt).toLocaleDateString()}</span>
						</div>
					</CardHeader>
					<CardContent>
						<CardDescription className="leading-relaxed">
							{post.body.length > 150
								? `${post.body.substring(0, 150)}...`
								: post.body}
						</CardDescription>
					</CardContent>
				</button>

				{/* Voting controls */}
				<div className="flex flex-col items-center justify-center gap-3 p-4 bg-gray-50 border-l border-gray-200 min-w-[80px]">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-100 disabled:opacity-50 rounded-full"
						onClick={handleUpvoteClick}
						disabled={isLoading}
						aria-label="Upvote post"
						isLoading={isUpvoting}
					>
						<UpvoteIcon className="w-5 h-5" />
					</Button>

					<span className="text-sm font-semibold text-gray-800 min-w-[2rem] text-center bg-white px-2 py-1 rounded-md shadow-sm border">
						{voteScore}
					</span>

					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100 disabled:opacity-50 rounded-full"
						onClick={handleDownvoteClick}
						disabled={isLoading || voteScore <= 0}
						aria-label="Downvote post"
						isLoading={isDownvoting}
					>
						<DownvoteIcon className="w-5 h-5" />
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default PostsListItem;

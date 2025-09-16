import { useNavigate } from "react-router-dom";
import { useGetPostsQuery, useGetUsersQuery, useResetPostsMutation } from "../store/api/postsApi";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import PostsListHeader from "./PostsListHeader";
import PostsListItem from "./PostsListItem";

interface PostsListProps {
	onNewPost: () => void;
}

const PostsList = ({ onNewPost }: PostsListProps) => {
	const navigate = useNavigate();
	const { data: posts, isLoading, isError } = useGetPostsQuery();
	const { data: users } = useGetUsersQuery();
	const [resetPosts, { isLoading: isResetting }] = useResetPostsMutation();

	const sortedPosts = posts ? [...posts].sort((a, b) => {
		const aScore = a.voteScore || 0;
		const bScore = b.voteScore || 0;
		return bScore - aScore;
	}) : [];

	function getUserName(userId: string) {
		const user = users?.find(u => u.id === userId);
		return user?.name || 'Unknown User';
	}

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError) {
		return <ErrorMessage message="Error loading posts" />;
	}

	return (
		<div>
			<PostsListHeader
				onNewPost={onNewPost}
				onReset={() => resetPosts()}
				isResetting={isResetting}
			/>

			<ul className="divide-y divide-gray-200">
				{sortedPosts.map((post) => (
					<PostsListItem
						key={post.id}
						post={post}
						getUserName={getUserName}
						onSelectPost={(postId) => navigate(`/posts/${postId}`)}
					/>
				))}
			</ul>
		</div>
	);
};

export default PostsList;

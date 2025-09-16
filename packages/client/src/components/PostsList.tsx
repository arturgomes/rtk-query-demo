import { useNavigate } from "react-router-dom";
import { useDeletePostMutation, useGetPostsQuery, useGetUsersQuery, useResetPostsMutation } from "../store/api/postsApi";
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
	const [deletePost] = useDeletePostMutation();
	const [resetPosts, { isLoading: isResetting }] = useResetPostsMutation();

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
				{posts?.map((post) => (
					<PostsListItem
						key={post.id}
						post={post}
						getUserName={getUserName}
						onSelectPost={(postId) => navigate(`/posts/${postId}`)}
						onDeletePost={(postId) => deletePost(postId)}
					/>
				))}
			</ul>
		</div>
	);
};

export default PostsList;

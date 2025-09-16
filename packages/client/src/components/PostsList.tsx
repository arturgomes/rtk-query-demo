import { useDeletePostMutation, useGetPostsQuery, useGetUsersQuery, useResetPostsMutation } from "../store/api/postsApi";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import PostsListHeader from "./PostsListHeader";
import PostsListItem from "./PostsListItem";

interface PostsListProps {
	onSelectPost: (postId: number) => void;
	onNewPost: () => void;
}

const PostsList = ({ onSelectPost, onNewPost }: PostsListProps) => {
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
						onSelectPost={onSelectPost}
						onDeletePost={(postId) => deletePost(postId)}
					/>
				))}
			</ul>
		</div>
	);
};

export default PostsList;

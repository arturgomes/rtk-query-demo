import { ResetButton, Button } from "./ui";
import { PlusIcon } from "./ui/icons";

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
				<ResetButton
					onClick={onReset}
					isResetting={isResetting}
				/>
				<Button
					onClick={onNewPost}
					leftIcon={<PlusIcon className="w-4 h-4" />}
				>
					New Post
				</Button>
			</div>
		</div>
	);
};

export default PostsListHeader;
import { Button } from "./ui";
import { PlusIcon } from "./ui/icons";

interface UsersListHeaderProps {
	onNewUser: () => void;
}

const UsersListHeader = ({ onNewUser }: UsersListHeaderProps) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<h1 className="text-2xl font-bold text-gray-800">Users</h1>
			<div className="flex space-x-3">
				<Button
					onClick={onNewUser}
					leftIcon={<PlusIcon className="w-4 h-4" />}
				>
					New User
				</Button>
			</div>
		</div>
	);
};

export default UsersListHeader;
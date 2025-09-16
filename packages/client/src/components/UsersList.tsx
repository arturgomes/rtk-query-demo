import { useGetUsersQuery } from "../store/api/postsApi";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./LoadingSpinner";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

interface UsersListProps {
	onNewUser: () => void;
}

const UsersList = ({ onNewUser }: UsersListProps) => {
	const { data: users, isLoading, isError } = useGetUsersQuery();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isError) {
		return <ErrorMessage message="Error loading users" />;
	}

	return (
		<div className="h-full flex flex-col">
			<UsersListHeader onNewUser={onNewUser} />

			<ul className="divide-y divide-gray-200 overflow-y-auto flex-1">
				{users?.map((user) => (
					<UsersListItem key={user.id} user={user} />
				))}
			</ul>
		</div>
	);
};

export default UsersList;
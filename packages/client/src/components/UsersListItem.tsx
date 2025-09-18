import type { User } from "../store/api/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "./ui";

interface UsersListItemProps {
	user: User;
}

const UsersListItem = ({ user }: UsersListItemProps) => {
	return (
		<Card className="group transition-all hover:shadow-lg mb-4 overflow-hidden">
			<div className="flex min-h-[100px]">
				<div className="flex-1">
					<CardHeader className="pb-3">
						<CardTitle className="mb-2 group-hover:text-blue-600 transition-colors">
							{user.name}
						</CardTitle>
						<div className="text-sm text-gray-500">
							@{user.username}
						</div>
					</CardHeader>
					<CardContent>
						<div className="text-sm text-gray-700">
							{user.email}
						</div>
					</CardContent>
				</div>
			</div>
		</Card>
	);
};

export default UsersListItem;
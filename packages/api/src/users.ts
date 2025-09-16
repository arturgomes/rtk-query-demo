export interface User {
	id: number;
	name: string;
	email: string;
	username: string;
}

const originalUsers: User[] = [
	{
		id: 101,
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		username: "alice_dev",
	},
	{
		id: 102,
		name: "Bob Smith",
		email: "bob.smith@example.com",
		username: "bob_coder",
	},
	{
		id: 103,
		name: "Carol Davis",
		email: "carol.davis@example.com",
		username: "carol_designer",
	},
	{
		id: 104,
		name: "David Wilson",
		email: "david.wilson@example.com",
		username: "david_architect",
	},
];

export const users: User[] = [...originalUsers];

export const resetUsers = (): User[] => {
	users.length = 0;
	users.push(...originalUsers);
	return users;
};
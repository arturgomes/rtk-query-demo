import { ObjectId } from 'bson';
import type { User } from '@rtk-query-demo/types';

const originalUsers: User[] = [
	{
		id: "507f1f77bcf86cd799439011",
		name: "Alice Johnson",
		email: "alice.johnson@example.com",
		username: "alice_dev",
	},
	{
		id: "507f1f77bcf86cd799439012",
		name: "Bob Smith",
		email: "bob.smith@example.com",
		username: "bob_coder",
	},
	{
		id: "507f1f77bcf86cd799439013",
		name: "Carol Davis",
		email: "carol.davis@example.com",
		username: "carol_designer",
	},
	{
		id: "507f1f77bcf86cd799439014",
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

export const addUser = (user: Omit<User, 'id'>): User => {
	const newId = new ObjectId().toHexString();
	const newUser: User = { ...user, id: newId };
	users.push(newUser);
	return newUser;
};

export const deleteUser = (id: string): boolean => {
	const index = users.findIndex(user => user.id === id);
	if (index === -1) {
		return false;
	}
	users.splice(index, 1);
	return true;
};

export const updateUser = (id: string, updates: Partial<Omit<User, 'id'>>): User | null => {
	const userIndex = users.findIndex(user => user.id === id);
	if (userIndex === -1) {
		return null;
	}
	users[userIndex] = { ...users[userIndex], ...updates };
	return users[userIndex];
};
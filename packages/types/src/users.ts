export interface User {
	id: string;
	name: string;
	email: string;
	username: string;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	username: string;
}

export interface UpdateUserRequest {
	id?: string;
	name?: string;
	email?: string;
	username?: string;
}
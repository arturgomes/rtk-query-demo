export interface Post {
	id: string;
	title: string;
	body: string;
	userId: string;
	createdAt: string;
	upvotes?: number;
	downvotes?: number;
	voteScore?: number;
}

export interface User {
	id: string;
	name: string;
	email: string;
	username: string;
}

export interface CreatePostRequest {
	title: string;
	body: string;
	userId: string;
}

export interface UpdatePostRequest {
	id: string;
	title?: string;
	body?: string;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	username: string;
}

export interface VoteResponse {
	upvotes: number;
	downvotes: number;
	voteScore: number;
}
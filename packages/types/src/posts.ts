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

export interface VoteData {
	upvotes: number;
	downvotes: number;
	voteScore: number;
}

export interface VoteResponse {
	upvotes: number;
	downvotes: number;
	voteScore: number;
}
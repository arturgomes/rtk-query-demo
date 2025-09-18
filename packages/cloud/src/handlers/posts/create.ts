import type { APIGatewayProxyHandler } from "aws-lambda";
import { ObjectId } from "bson";
import { dynamodb, PutCommand, TABLES } from "../../lib/dynamodb.js";
import {
	badRequestResponse,
	createdResponse,
	internalServerErrorResponse,
} from "../../lib/response.js";
import type { CreatePostRequest, Post } from "../../types/posts.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		if (!event.body) {
			return badRequestResponse("Request body is required");
		}

		const requestBody: CreatePostRequest = JSON.parse(event.body);
		const { title, body, userId } = requestBody;

		if (!title || !body || !userId) {
			return badRequestResponse("title, body, and userId are required");
		}

		const newPost: Post = {
			id: new ObjectId().toHexString(),
			title,
			body,
			userId,
			createdAt: new Date().toISOString(),
			upvotes: 0,
			downvotes: 0,
			voteScore: 0,
		};

		const command = new PutCommand({
			TableName: TABLES.POSTS,
			Item: newPost,
		});

		await dynamodb.send(command);

		return createdResponse(newPost);
	} catch (error) {
		console.error("Error creating post:", error);
		return internalServerErrorResponse("Failed to create post");
	}
};

import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";
import { Post, VoteData } from "../../types/posts.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("Post ID is required");
		}

		const command = new GetCommand({
			TableName: TABLES.POSTS,
			Key: { id },
		});

		const response = await dynamodb.send(command);

		if (!response.Item) {
			return notFoundResponse("Post not found");
		}

		const post = response.Item as Post;

		const voteData: VoteData = {
			upvotes: post.upvotes || 0,
			downvotes: post.downvotes || 0,
			voteScore: post.voteScore || 0,
		};

		return successResponse(voteData);
	} catch (error) {
		console.error("Error fetching vote data:", error);
		return internalServerErrorResponse("Failed to fetch vote data");
	}
};
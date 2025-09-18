import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";
import { Post } from "../../types/posts.js";

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

		return successResponse(response.Item as Post);
	} catch (error) {
		console.error("Error fetching post:", error);
		return internalServerErrorResponse("Failed to fetch post");
	}
};
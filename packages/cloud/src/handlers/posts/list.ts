import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, ScanCommand } from "../../lib/dynamodb.js";
import { successResponse, internalServerErrorResponse } from "../../lib/response.js";
import { Post } from "../../types/posts.js";

export const handler: APIGatewayProxyHandler = async () => {
	try {
		const command = new ScanCommand({
			TableName: TABLES.POSTS,
		});

		const response = await dynamodb.send(command);
		const posts: Post[] = response.Items as Post[] || [];

		return successResponse(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		return internalServerErrorResponse("Failed to fetch posts");
	}
};
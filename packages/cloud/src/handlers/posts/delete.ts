import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, DeleteCommand } from "../../lib/dynamodb.js";
import { noContentResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("Post ID is required");
		}

		const getCommand = new GetCommand({
			TableName: TABLES.POSTS,
			Key: { id },
		});

		const existingPost = await dynamodb.send(getCommand);

		if (!existingPost.Item) {
			return notFoundResponse("Post not found");
		}

		const deleteCommand = new DeleteCommand({
			TableName: TABLES.POSTS,
			Key: { id },
		});

		await dynamodb.send(deleteCommand);

		return noContentResponse();
	} catch (error) {
		console.error("Error deleting post:", error);
		return internalServerErrorResponse("Failed to delete post");
	}
};
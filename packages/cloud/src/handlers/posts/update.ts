import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, UpdateCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, badRequestResponse, internalServerErrorResponse } from "../../lib/response.js";
import { Post, UpdatePostRequest } from "../../types/posts.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("Post ID is required");
		}

		if (!event.body) {
			return badRequestResponse("Request body is required");
		}

		const updateData: UpdatePostRequest = JSON.parse(event.body);
		const { title, body } = updateData;

		const getCommand = new GetCommand({
			TableName: TABLES.POSTS,
			Key: { id },
		});

		const existingPost = await dynamodb.send(getCommand);

		if (!existingPost.Item) {
			return notFoundResponse("Post not found");
		}

		const updateExpression: string[] = [];
		const expressionAttributeValues: Record<string, any> = {};

		if (title) {
			updateExpression.push("title = :title");
			expressionAttributeValues[":title"] = title;
		}

		if (body) {
			updateExpression.push("body = :body");
			expressionAttributeValues[":body"] = body;
		}

		if (updateExpression.length === 0) {
			return badRequestResponse("At least one field (title or body) must be provided");
		}

		const updateCommand = new UpdateCommand({
			TableName: TABLES.POSTS,
			Key: { id },
			UpdateExpression: `SET ${updateExpression.join(", ")}`,
			ExpressionAttributeValues: expressionAttributeValues,
			ReturnValues: "ALL_NEW",
		});

		const response = await dynamodb.send(updateCommand);

		return successResponse(response.Attributes as Post);
	} catch (error) {
		console.error("Error updating post:", error);
		return internalServerErrorResponse("Failed to update post");
	}
};
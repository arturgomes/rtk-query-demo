import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, DeleteCommand } from "../../lib/dynamodb.js";
import { noContentResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("User ID is required");
		}

		const getCommand = new GetCommand({
			TableName: TABLES.USERS,
			Key: { id },
		});

		const existingUser = await dynamodb.send(getCommand);

		if (!existingUser.Item) {
			return notFoundResponse("User not found");
		}

		const deleteCommand = new DeleteCommand({
			TableName: TABLES.USERS,
			Key: { id },
		});

		await dynamodb.send(deleteCommand);

		return noContentResponse();
	} catch (error) {
		console.error("Error deleting user:", error);
		return internalServerErrorResponse("Failed to delete user");
	}
};
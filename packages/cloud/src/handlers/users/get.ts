import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";
import { User } from "../../types/users.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("User ID is required");
		}

		const command = new GetCommand({
			TableName: TABLES.USERS,
			Key: { id },
		});

		const response = await dynamodb.send(command);

		if (!response.Item) {
			return notFoundResponse("User not found");
		}

		return successResponse(response.Item as User);
	} catch (error) {
		console.error("Error fetching user:", error);
		return internalServerErrorResponse("Failed to fetch user");
	}
};
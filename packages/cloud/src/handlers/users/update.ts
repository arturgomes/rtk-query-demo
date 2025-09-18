import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, UpdateCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, badRequestResponse, internalServerErrorResponse } from "../../lib/response.js";
import { User, UpdateUserRequest } from "../../types/users.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		const { id } = event.pathParameters || {};

		if (!id) {
			return notFoundResponse("User ID is required");
		}

		if (!event.body) {
			return badRequestResponse("Request body is required");
		}

		const updateData: UpdateUserRequest = JSON.parse(event.body);
		const { name, email, username } = updateData;

		const getCommand = new GetCommand({
			TableName: TABLES.USERS,
			Key: { id },
		});

		const existingUser = await dynamodb.send(getCommand);

		if (!existingUser.Item) {
			return notFoundResponse("User not found");
		}

		const updateExpression: string[] = [];
		const expressionAttributeValues: Record<string, any> = {};

		if (name) {
			updateExpression.push("name = :name");
			expressionAttributeValues[":name"] = name;
		}

		if (email) {
			updateExpression.push("email = :email");
			expressionAttributeValues[":email"] = email;
		}

		if (username) {
			updateExpression.push("username = :username");
			expressionAttributeValues[":username"] = username;
		}

		if (updateExpression.length === 0) {
			return badRequestResponse("At least one field (name, email, or username) must be provided");
		}

		const updateCommand = new UpdateCommand({
			TableName: TABLES.USERS,
			Key: { id },
			UpdateExpression: `SET ${updateExpression.join(", ")}`,
			ExpressionAttributeValues: expressionAttributeValues,
			ReturnValues: "ALL_NEW",
		});

		const response = await dynamodb.send(updateCommand);

		return successResponse(response.Attributes as User);
	} catch (error) {
		console.error("Error updating user:", error);
		return internalServerErrorResponse("Failed to update user");
	}
};
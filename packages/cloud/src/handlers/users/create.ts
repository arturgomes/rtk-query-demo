import { APIGatewayProxyHandler } from "aws-lambda";
import { ObjectId } from "bson";
import { dynamodb, TABLES, PutCommand } from "../../lib/dynamodb.js";
import { createdResponse, badRequestResponse, internalServerErrorResponse } from "../../lib/response.js";
import { User, CreateUserRequest } from "../../types/users.js";

export const handler: APIGatewayProxyHandler = async (event) => {
	try {
		if (!event.body) {
			return badRequestResponse("Request body is required");
		}

		const requestBody: CreateUserRequest = JSON.parse(event.body);
		const { name, email, username } = requestBody;

		if (!name || !email || !username) {
			return badRequestResponse("name, email, and username are required");
		}

		const newUser: User = {
			id: new ObjectId().toHexString(),
			name,
			email,
			username,
		};

		const command = new PutCommand({
			TableName: TABLES.USERS,
			Item: newUser,
		});

		await dynamodb.send(command);

		return createdResponse(newUser);
	} catch (error) {
		console.error("Error creating user:", error);
		return internalServerErrorResponse("Failed to create user");
	}
};
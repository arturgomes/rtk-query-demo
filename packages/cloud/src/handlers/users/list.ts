import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, ScanCommand } from "../../lib/dynamodb.js";
import { successResponse, internalServerErrorResponse } from "../../lib/response.js";
import { User } from "../../types/users.js";

export const handler: APIGatewayProxyHandler = async () => {
	try {
		const command = new ScanCommand({
			TableName: TABLES.USERS,
		});

		const response = await dynamodb.send(command);
		const users: User[] = response.Items as User[] || [];

		return successResponse(users);
	} catch (error) {
		console.error("Error fetching users:", error);
		return internalServerErrorResponse("Failed to fetch users");
	}
};
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
	region: process.env.AWS_REGION || "us-east-1",
});

export const dynamodb = DynamoDBDocumentClient.from(client);

export const TABLES = {
	POSTS: process.env.DYNAMODB_POSTS_TABLE || "rtk-demo-posts",
	USERS: process.env.DYNAMODB_USERS_TABLE || "rtk-demo-users",
};

export { GetCommand, PutCommand, DeleteCommand, ScanCommand, UpdateCommand };
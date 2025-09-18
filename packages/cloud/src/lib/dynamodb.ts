import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, DeleteCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const isOffline = process.env.IS_OFFLINE === 'true' || process.env.NODE_ENV === 'development';

const clientConfig = {
	region: process.env.AWS_REGION || "us-east-1",
	...(isOffline && {
		endpoint: "http://127.0.0.1:8000",
		credentials: {
			accessKeyId: "fake",
			secretAccessKey: "fake",
		},
	}),
};

console.log("DynamoDB Client config:", {
	isOffline,
	IS_OFFLINE: process.env.IS_OFFLINE,
	NODE_ENV: process.env.NODE_ENV,
	config: clientConfig
});

const client = new DynamoDBClient(clientConfig);

export const dynamodb = DynamoDBDocumentClient.from(client);

export const TABLES = {
	POSTS: process.env.DYNAMODB_POSTS_TABLE || "rtk-demo-posts",
	USERS: process.env.DYNAMODB_USERS_TABLE || "rtk-demo-users",
};

export { GetCommand, PutCommand, DeleteCommand, ScanCommand, UpdateCommand };
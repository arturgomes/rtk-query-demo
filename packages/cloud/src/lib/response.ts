import { APIGatewayProxyResult } from "aws-lambda";

export interface APIResponse {
	statusCode: number;
	headers: Record<string, string>;
	body: string;
}

export const createResponse = (
	statusCode: number,
	body: any,
	additionalHeaders: Record<string, string> = {}
): APIGatewayProxyResult => {
	return {
		statusCode,
		headers: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			...additionalHeaders,
		},
		body: JSON.stringify(body),
	};
};

export const successResponse = (data: any): APIGatewayProxyResult => {
	return createResponse(200, data);
};

export const createdResponse = (data: any): APIGatewayProxyResult => {
	return createResponse(201, data);
};

export const noContentResponse = (): APIGatewayProxyResult => {
	return createResponse(204, null);
};

export const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult => {
	return createResponse(statusCode, { error: message });
};

export const notFoundResponse = (message: string = "Resource not found"): APIGatewayProxyResult => {
	return errorResponse(404, message);
};

export const badRequestResponse = (message: string): APIGatewayProxyResult => {
	return errorResponse(400, message);
};

export const internalServerErrorResponse = (message: string = "Internal server error"): APIGatewayProxyResult => {
	return errorResponse(500, message);
};
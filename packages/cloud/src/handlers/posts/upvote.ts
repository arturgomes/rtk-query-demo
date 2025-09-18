import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, UpdateCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, internalServerErrorResponse } from "../../lib/response.js";
import { Post, VoteData } from "../../types/posts.js";

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

		const response = await dynamodb.send(getCommand);

		if (!response.Item) {
			return notFoundResponse("Post not found");
		}

		const post = response.Item as Post;
		const newUpvotes = (post.upvotes || 0) + 1;
		const newVoteScore = newUpvotes - (post.downvotes || 0);

		const updateCommand = new UpdateCommand({
			TableName: TABLES.POSTS,
			Key: { id },
			UpdateExpression: "SET upvotes = :upvotes, voteScore = :voteScore",
			ExpressionAttributeValues: {
				":upvotes": newUpvotes,
				":voteScore": newVoteScore,
			},
			ReturnValues: "NONE",
		});

		await dynamodb.send(updateCommand);

		const voteData: VoteData = {
			upvotes: newUpvotes,
			downvotes: post.downvotes || 0,
			voteScore: newVoteScore,
		};

		return successResponse(voteData);
	} catch (error) {
		console.error("Error upvoting post:", error);
		return internalServerErrorResponse("Failed to upvote post");
	}
};
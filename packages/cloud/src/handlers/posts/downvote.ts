import { APIGatewayProxyHandler } from "aws-lambda";
import { dynamodb, TABLES, GetCommand, UpdateCommand } from "../../lib/dynamodb.js";
import { successResponse, notFoundResponse, badRequestResponse, internalServerErrorResponse } from "../../lib/response.js";
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
		const currentScore = (post.upvotes || 0) - (post.downvotes || 0);

		if (currentScore <= 0) {
			return badRequestResponse("Cannot downvote when score is zero or below");
		}

		const newDownvotes = (post.downvotes || 0) + 1;
		const newVoteScore = (post.upvotes || 0) - newDownvotes;

		const updateCommand = new UpdateCommand({
			TableName: TABLES.POSTS,
			Key: { id },
			UpdateExpression: "SET downvotes = :downvotes, voteScore = :voteScore",
			ExpressionAttributeValues: {
				":downvotes": newDownvotes,
				":voteScore": newVoteScore,
			},
			ReturnValues: "NONE",
		});

		await dynamodb.send(updateCommand);

		const voteData: VoteData = {
			upvotes: post.upvotes || 0,
			downvotes: newDownvotes,
			voteScore: newVoteScore,
		};

		return successResponse(voteData);
	} catch (error) {
		console.error("Error downvoting post:", error);
		return internalServerErrorResponse("Failed to downvote post");
	}
};
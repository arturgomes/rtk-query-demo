import type { VoteResponse } from "./types";
import { baseApi } from "./baseApi";

export const votesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		upvotePost: builder.mutation<VoteResponse, string>({
			query: (postId) => ({
				url: `/posts/${postId}/upvote`,
				method: "POST",
			}),
			invalidatesTags: (_, __, postId) => [
				{ type: "Post", id: postId },
				{ type: "Post", id: "LIST" },
			],
		}),
		downvotePost: builder.mutation<VoteResponse, string>({
			query: (postId) => ({
				url: `/posts/${postId}/downvote`,
				method: "POST",
			}),
			invalidatesTags: (_, __, postId) => [
				{ type: "Post", id: postId },
				{ type: "Post", id: "LIST" },
			],
		}),
		getPostVotes: builder.query<VoteResponse, string>({
			query: (postId) => ({
				url: `/posts/${postId}/votes`,
			}),
			providesTags: (_, __, postId) => [{ type: "Post", id: postId }],
		}),
	}),
});

export const {
	useUpvotePostMutation,
	useDownvotePostMutation,
	useGetPostVotesQuery,
} = votesApi;
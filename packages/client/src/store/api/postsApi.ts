// src/store/api/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

export interface CreatePostRequest {
	title: string;
	body: string;
	userId: number;
}

export interface UpdatePostRequest {
	id: number;
	title?: string;
	body?: string;
}

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
	}),
	tagTypes: ["Post"], // Add tag type for cache invalidation
	endpoints: (builder) => ({
		getPosts: builder.query<Post[], void>({
			query: () => "/posts",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Post" as const, id })),
							{ type: "Post", id: "LIST" },
						]
					: [{ type: "Post", id: "LIST" }],
		}),
		getPostById: builder.query<Post, number>({
			query: (id) => `/posts/${id}`,
			providesTags: (_, __, id) => [{ type: "Post", id }],
		}),
		addPost: builder.mutation<Post, CreatePostRequest>({
			query: (post) => ({
				url: "/posts",
				method: "POST",
				body: post,
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
		updatePost: builder.mutation<Post, UpdatePostRequest>({
			query: ({ id, ...patch }) => ({
				url: `/posts/${id}`,
				method: "PATCH",
				body: patch,
			}),
			invalidatesTags: (_, __, { id }) => [{ type: "Post", id }],
		}),
		deletePost: builder.mutation<void, number>({
			query: (id) => ({
				url: `/posts/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: (_, __, id) => [
				{ type: "Post", id },
				{ type: "Post", id: "LIST" },
			],
		}),
		resetPosts: builder.mutation<{ message: string; posts: Post[] }, void>({
			query: () => ({
				url: "/posts/reset",
				method: "POST",
			}),
			invalidatesTags: [{ type: "Post", id: "LIST" }],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostByIdQuery,
	useAddPostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useResetPostsMutation,
} = postsApi;

// src/store/api/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
	id: string;
	title: string;
	body: string;
	userId: string;
	createdAt: string;
}

export interface User {
	id: string;
	name: string;
	email: string;
	username: string;
}

export interface CreatePostRequest {
	title: string;
	body: string;
	userId: string;
}

export interface UpdatePostRequest {
	id: string;
	title?: string;
	body?: string;
}

export const postsApi = createApi({
	reducerPath: "postsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001",
	}),
	tagTypes: ["Post", "User"], // Add tag types for cache invalidation
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
		getPostById: builder.query<Post, string>({
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
		deletePost: builder.mutation<void, string>({
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
		getUsers: builder.query<User[], void>({
			query: () => "/users",
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "User" as const, id })),
							{ type: "User", id: "LIST" },
						]
					: [{ type: "User", id: "LIST" }],
		}),
		getUserById: builder.query<User, string>({
			query: (id) => `/users/${id}`,
			providesTags: (_, __, id) => [{ type: "User", id }],
		}),
		getPostsByUserId: builder.query<Post[], string>({
			query: (userId) => `/users/${userId}/posts`,
			providesTags: (result, _, userId) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Post" as const, id })),
							{ type: "Post", id: `USER_${userId}` },
						]
					: [{ type: "Post", id: `USER_${userId}` }],
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
	useGetUsersQuery,
	useGetUserByIdQuery,
	useGetPostsByUserIdQuery,
} = postsApi;

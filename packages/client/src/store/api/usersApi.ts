import type { CreateUserRequest, Post, User } from "@rtk-query-demo/types";

import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
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
		addUser: builder.mutation<User, CreateUserRequest>({
			query: (user) => ({
				url: "/users",
				method: "POST",
				body: user,
			}),
			invalidatesTags: [{ type: "User", id: "LIST" }],
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
	useGetUsersQuery,
	useGetUserByIdQuery,
	useAddUserMutation,
	useGetPostsByUserIdQuery,
} = usersApi;

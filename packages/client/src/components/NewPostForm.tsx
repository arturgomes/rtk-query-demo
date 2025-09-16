// src/components/NewPostForm.tsx
import { useForm } from "react-hook-form";
import { useAddPostMutation, useGetUsersQuery } from "../store/api/postsApi";
import { CreateButton, CancelButton } from "./ui";

interface NewPostFormProps {
	onPostAdded: () => void;
}

interface FormData {
	title: string;
	body: string;
	userId: string;
}

const NewPostForm = ({ onPostAdded }: NewPostFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: "onChange",
		defaultValues: {
			title: "",
			body: "",
			userId: "",
		},
	});
	const [addPost, { isLoading }] = useAddPostMutation();
	const { data: users, isLoading: usersLoading } = useGetUsersQuery();

	const onSubmit = async (data: FormData) => {
		await addPost({
			title: data.title,
			body: data.body,
			userId: data.userId,
		});
		reset();
		onPostAdded();
	};

	return (
		<div>
			<h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
				<div className="mb-4">
					<label
						htmlFor="new-title"
						className="block text-gray-700 font-medium mb-2"
					>
						Title:
					</label>
					<input
						id="new-title"
						{...register("title", { required: "Title is required" })}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.title && (
						<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="user-select"
						className="block text-gray-700 font-medium mb-2"
					>
						User:
					</label>
					<select
						id="user-select"
						{...register("userId", { required: "Please select a user" })}
						disabled={isLoading || usersLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select a user...</option>
						{users?.map((user) => (
							<option key={user.id} value={user.id}>
								{user.name} ({user.username})
							</option>
						))}
					</select>
					{errors.userId && (
						<p className="text-red-500 text-sm mt-1">{errors.userId.message}</p>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="new-body"
						className="block text-gray-700 font-medium mb-2"
					>
						Content:
					</label>
					<textarea
						id="new-body"
						{...register("body", { required: "Content is required" })}
						disabled={isLoading}
						rows={6}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.body && (
						<p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
					)}
				</div>
				<div className="flex justify-between">
					<CancelButton
						onClick={onPostAdded}
					/>
					<CreateButton
						type="submit"
						disabled={!isValid || isLoading}
						isCreating={isLoading}
					/>
				</div>
			</form>
		</div>
	);
};

export default NewPostForm;

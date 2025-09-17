import { useForm } from "react-hook-form";
import { useAddUserMutation } from "../store/api";
import { CancelButton, CreateButton } from "./ui";

interface NewUserFormProps {
	onUserAdded: () => void;
}

interface FormData {
	name: string;
	email: string;
	username: string;
}

const NewUserForm = ({ onUserAdded }: NewUserFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormData>({
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			username: "",
		},
	});
	const [addUser, { isLoading }] = useAddUserMutation();

	const onSubmit = async (data: FormData) => {
		await addUser({
			name: data.name,
			email: data.email,
			username: data.username,
		});
		reset();
		onUserAdded();
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl">
				<div className="mb-4">
					<label
						htmlFor="new-name"
						className="block text-gray-700 font-medium mb-2"
					>
						Name:
					</label>
					<input
						id="new-name"
						{...register("name", { required: "Name is required" })}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="new-username"
						className="block text-gray-700 font-medium mb-2"
					>
						Username:
					</label>
					<input
						id="new-username"
						{...register("username", { required: "Username is required" })}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.username && (
						<p className="text-red-500 text-sm mt-1">
							{errors.username.message}
						</p>
					)}
				</div>
				<div className="mb-6">
					<label
						htmlFor="new-email"
						className="block text-gray-700 font-medium mb-2"
					>
						Email:
					</label>
					<input
						id="new-email"
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^\S+@\S+$/i,
								message: "Invalid email address",
							},
						})}
						disabled={isLoading}
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>
				<div className="flex justify-between">
					<CancelButton onClick={onUserAdded} />
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

export default NewUserForm;

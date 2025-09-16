import { forwardRef } from "react";
import { Button, type ButtonProps } from "./Button";
import { PlusIcon, TrashIcon, RefreshIcon, ChevronLeftIcon } from "./icons";

interface CreateButtonProps extends Omit<ButtonProps, "children" | "leftIcon"> {
	isCreating?: boolean;
}

export const CreateButton = forwardRef<HTMLButtonElement, CreateButtonProps>(
	({ isCreating = false, ...props }, ref) => (
		<Button
			ref={ref}
			variant="primary"
			leftIcon={<PlusIcon className="w-4 h-4" />}
			isLoading={isCreating}
			{...props}
		>
			{isCreating ? "Creating..." : "Create Post"}
		</Button>
	)
);

CreateButton.displayName = "CreateButton";

interface SaveButtonProps extends Omit<ButtonProps, "children"> {
	isSaving?: boolean;
}

export const SaveButton = forwardRef<HTMLButtonElement, SaveButtonProps>(
	({ isSaving = false, ...props }, ref) => (
		<Button
			ref={ref}
			variant="primary"
			isLoading={isSaving}
			{...props}
		>
			{isSaving ? "Saving..." : "Save Changes"}
		</Button>
	)
);

SaveButton.displayName = "SaveButton";

interface DeleteButtonProps extends Omit<ButtonProps, "children" | "leftIcon"> {
	isDeleting?: boolean;
}

export const DeleteButton = forwardRef<HTMLButtonElement, DeleteButtonProps>(
	({ isDeleting = false, size = "sm", ...props }, ref) => (
		<Button
			ref={ref}
			variant="danger"
			leftIcon={<TrashIcon className="w-4 h-4" />}
			isLoading={isDeleting}
			size={size}
			{...props}
		>
			{isDeleting ? "Deleting..." : "Delete"}
		</Button>
	)
);

DeleteButton.displayName = "DeleteButton";

interface ResetButtonProps extends Omit<ButtonProps, "children" | "leftIcon"> {
	isResetting?: boolean;
}

export const ResetButton = forwardRef<HTMLButtonElement, ResetButtonProps>(
	({ isResetting = false, ...props }, ref) => (
		<Button
			ref={ref}
			variant="secondary"
			leftIcon={<RefreshIcon className="w-4 h-4" />}
			isLoading={isResetting}
			{...props}
		>
			{isResetting ? "Resetting..." : "Reset"}
		</Button>
	)
);

ResetButton.displayName = "ResetButton";

interface CancelButtonProps extends Omit<ButtonProps, "children"> {}

export const CancelButton = forwardRef<HTMLButtonElement, CancelButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			variant="secondary"
			{...props}
		>
			Cancel
		</Button>
	)
);

CancelButton.displayName = "CancelButton";

interface BackButtonProps extends Omit<ButtonProps, "children" | "leftIcon"> {}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			variant="link"
			leftIcon={<ChevronLeftIcon className="w-5 h-5" />}
			{...props}
		>
			Back to posts
		</Button>
	)
);

BackButton.displayName = "BackButton";

interface EditButtonProps extends Omit<ButtonProps, "children"> {}

export const EditButton = forwardRef<HTMLButtonElement, EditButtonProps>(
	(props, ref) => (
		<Button
			ref={ref}
			variant="primary"
			{...props}
		>
			Edit
		</Button>
	)
);

EditButton.displayName = "EditButton";

interface PostItemButtonProps extends Omit<ButtonProps, "variant" | "className"> {}

export const PostItemButton = forwardRef<HTMLButtonElement, PostItemButtonProps>(
	({ children, ...props }, ref) => (
		<Button
			ref={ref}
			variant="ghost"
			className="flex-1 cursor-pointer group-hover:bg-gray-50 p-3 rounded-lg transition text-left w-full justify-start"
			{...props}
		>
			{children}
		</Button>
	)
);

PostItemButton.displayName = "PostItemButton";

interface IconButtonProps extends Omit<ButtonProps, "children" | "variant" | "size"> {
	icon: React.ReactNode;
	"aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	({ icon, className, ...props }, ref) => (
		<Button
			ref={ref}
			variant="ghost"
			size="sm"
			className={`p-2 ${className || ""}`}
			{...props}
		>
			{icon}
		</Button>
	)
);

IconButton.displayName = "IconButton";
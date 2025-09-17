import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import NewPostForm from "./NewPostForm";

interface NewPostDrawerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

const NewPostDrawer = ({ open, onOpenChange }: NewPostDrawerProps) => {
	const handlePostAdded = () => {
		onOpenChange(false);
	};

	return (
		<Dialog.Root open={open} onOpenChange={({ open }) => onOpenChange(open)}>
			<Portal>
				<Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
				<Dialog.Positioner className="fixed inset-0 z-50 flex justify-end">
					<Dialog.Content className="bg-white h-full w-full max-w-md shadow-xl overflow-y-auto animate-in slide-in-from-right duration-300">
						<div className="p-6">
							<div className="flex items-center justify-between mb-6">
								<Dialog.Title className="text-2xl font-bold text-gray-800">
									Create New Post
								</Dialog.Title>
								<Dialog.CloseTrigger className="p-2 hover:bg-gray-100 rounded-md">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</Dialog.CloseTrigger>
							</div>
							<NewPostForm onPostAdded={handlePostAdded} />
						</div>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default NewPostDrawer;
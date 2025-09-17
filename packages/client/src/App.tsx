// src/App.tsx

import { Tabs } from "@ark-ui/react/tabs";
import { useState } from "react";
import {
	BrowserRouter,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router-dom";
import {
	NewPostDrawer,
	NewUserDrawer,
	PostDetail,
	PostsList,
	UsersList,
} from "./components";

function PostDetailWrapper() {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();

	if (!postId) {
		return <div>Post not found</div>;
	}

	return <PostDetail postId={postId} onBack={() => navigate("/")} />;
}

function PostsListWrapper({ onNewPost }: { onNewPost: () => void }) {
	return <PostsList onNewPost={onNewPost} />;
}

function UsersListWrapper({ onNewUser }: { onNewUser: () => void }) {
	return <UsersList onNewUser={onNewUser} />;
}

function App() {
	const [isNewPostDrawerOpen, setIsNewPostDrawerOpen] = useState(false);
	const [isNewUserDrawerOpen, setIsNewUserDrawerOpen] = useState(false);

	return (
		<BrowserRouter>
			<div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
				<Tabs.Root defaultValue="posts" className="h-full flex flex-col">
					<header className="bg-gray-800 text-white p-6 rounded-t-lg flex-shrink-0 flex justify-between">
						<h1 className="text-2xl font-bold">Blog Central</h1>
						<Tabs.List className="flex gap-2">
							<Tabs.Trigger
								value="posts"
								className="px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-black transition-colors"
							>
								Posts
							</Tabs.Trigger>
							<Tabs.Trigger
								value="users"
								className="px-4 py-2 rounded-md text-black bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-black transition-colors"
							>
								Users
							</Tabs.Trigger>
						</Tabs.List>
					</header>

					<main className="bg-white rounded-lg p-6 shadow-md flex-1 overflow-auto">
						<Tabs.Content value="posts" className="flex-1 overflow-auto">
							<Routes>
								<Route
									path="/"
									element={
										<PostsListWrapper
											onNewPost={() => setIsNewPostDrawerOpen(true)}
										/>
									}
								/>
								<Route path="/posts/:postId" element={<PostDetailWrapper />} />
							</Routes>
						</Tabs.Content>
						<Tabs.Content value="users" className="flex-1 overflow-auto">
							<Routes>
								<Route
									path="/"
									element={
										<UsersListWrapper
											onNewUser={() => setIsNewUserDrawerOpen(true)}
										/>
									}
								/>
							</Routes>
						</Tabs.Content>
					</main>
				</Tabs.Root>

				<NewPostDrawer
					open={isNewPostDrawerOpen}
					onOpenChange={setIsNewPostDrawerOpen}
				/>
				<NewUserDrawer
					open={isNewUserDrawerOpen}
					onOpenChange={setIsNewUserDrawerOpen}
				/>
			</div>
		</BrowserRouter>
	);
}

export default App;

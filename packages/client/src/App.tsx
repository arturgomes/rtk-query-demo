// src/App.tsx

import { Tabs } from "@ark-ui/react/tabs";
import {
	BrowserRouter,
	Route,
	Routes,
	useNavigate,
	useParams,
} from "react-router-dom";
import {
	NewPostForm,
	NewUserForm,
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

function NewPostFormWrapper() {
	const navigate = useNavigate();

	return <NewPostForm onPostAdded={() => navigate("/")} />;
}

function PostsListWrapper() {
	const navigate = useNavigate();

	return <PostsList onNewPost={() => navigate("/new")} />;
}

function NewUserFormWrapper() {
	const navigate = useNavigate();

	return <NewUserForm onUserAdded={() => navigate("/")} />;
}

function UsersListWrapper() {
	const navigate = useNavigate();

	return <UsersList onNewUser={() => navigate("/new-user")} />;
}

function TabsWrapper() {
	return (
		<Tabs.Root defaultValue="posts" className="h-full flex flex-col">
			<Tabs.List className="flex space-x-4 mb-6">
				<Tabs.Trigger
					value="posts"
					className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors"
				>
					Posts
				</Tabs.Trigger>
				<Tabs.Trigger
					value="users"
					className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-colors"
				>
					Users
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="posts" className="flex-1 overflow-auto">
				<Routes>
					<Route path="/" element={<PostsListWrapper />} />
					<Route path="/posts/:postId" element={<PostDetailWrapper />} />
					<Route path="/new" element={<NewPostFormWrapper />} />
				</Routes>
			</Tabs.Content>
			<Tabs.Content value="users" className="flex-1 overflow-auto">
				<Routes>
					<Route path="/" element={<UsersListWrapper />} />
					<Route path="/new-user" element={<NewUserFormWrapper />} />
				</Routes>
			</Tabs.Content>
		</Tabs.Root>
	);
}

function App() {
	return (
		<BrowserRouter>
			<div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
				<header className="bg-gray-800 text-white p-6 rounded-t-lg flex-shrink-0">
					<h1 className="text-2xl font-bold">RTK Query Demo with React 19</h1>
				</header>

				<main className="bg-white rounded-lg p-6 shadow-md flex-1 overflow-auto">
					<TabsWrapper />
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;

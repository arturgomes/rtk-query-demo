// src/App.tsx
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import { NewPostForm, PostDetail, PostsList } from "./components";

function PostDetailWrapper() {
	const { postId } = useParams<{ postId: string }>();
	const navigate = useNavigate();

	if (!postId) {
		return <div>Post not found</div>;
	}

	return (
		<PostDetail
			postId={postId}
			onBack={() => navigate("/")}
		/>
	);
}

function NewPostFormWrapper() {
	const navigate = useNavigate();

	return (
		<NewPostForm onPostAdded={() => navigate("/")} />
	);
}

function PostsListWrapper() {
	const navigate = useNavigate();

	return (
		<PostsList onNewPost={() => navigate("/new")} />
	);
}

function App() {
	return (
		<BrowserRouter>
			<div className="max-w-4xl mx-auto p-4">
				<header className="bg-gray-800 text-white p-6 rounded-t-lg mb-6">
					<h1 className="text-2xl font-bold">RTK Query Demo with React 19</h1>
				</header>

				<main className="bg-white rounded-lg p-6 shadow-md">
					<Routes>
						<Route path="/" element={<PostsListWrapper />} />
						<Route path="/posts/:postId" element={<PostDetailWrapper />} />
						<Route path="/new" element={<NewPostFormWrapper />} />
					</Routes>
				</main>
			</div>
		</BrowserRouter>
	);
}

export default App;

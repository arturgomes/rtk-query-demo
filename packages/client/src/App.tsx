// src/App.tsx
import { useState } from "react";
import { NewPostForm, PostDetail, PostsList } from "./components";

type View = "list" | "detail" | "new";

function App() {
	const [view, setView] = useState<View>("list");
	const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

	const showPostsList = () => {
		setView("list");
		setSelectedPostId(null);
	};

	const showPostDetail = (postId: number) => {
		setSelectedPostId(postId);
		setView("detail");
	};

	const showNewPostForm = () => {
		setView("new");
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<header className="bg-gray-800 text-white p-6 rounded-t-lg mb-6">
				<h1 className="text-2xl font-bold">RTK Query Demo with React 19</h1>
			</header>

			<main className="bg-white rounded-lg p-6 shadow-md">
				{view === "list" && (
					<PostsList
						onSelectPost={showPostDetail}
						onNewPost={showNewPostForm}
					/>
				)}

				{view === "detail" && selectedPostId && (
					<PostDetail postId={selectedPostId} onBack={showPostsList} />
				)}

				{view === "new" && <NewPostForm onPostAdded={showPostsList} />}
			</main>
		</div>
	);
}

export default App;

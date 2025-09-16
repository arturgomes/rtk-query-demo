export interface Post {
	id: number;
	title: string;
	body: string;
	userId: number;
}

const originalPosts: Post[] = [
	{
		id: 1,
		title: "Optimizing React Performance",
		body: "React applications can slow down as they grow in complexity. This post explores techniques such as memoization, virtualization, and code splitting to enhance performance without sacrificing functionality. Learn how to identify bottlenecks using the React DevTools profiler.",
		userId: 101,
	},
	{
		id: 2,
		title: "TypeScript Best Practices in 2025",
		body: "TypeScript continues to evolve with each release. This guide covers the latest recommended patterns, including strict null checks, discriminated unions, and utility types. We'll also explore how to structure your project for maximum type safety while maintaining developer productivity.",
		userId: 102,
	},
	{
		id: 3,
		title: "Building Microservices with Node.js",
		body: "Microservice architecture offers scalability and flexibility, but comes with its own challenges. This post demonstrates how to create robust microservices using Node.js, implement service discovery, and handle inter-service communication efficiently.",
		userId: 101,
	},
	{
		id: 4,
		title: "The State of Web Accessibility in 2025",
		body: "Creating inclusive web applications isn't just good practice—it's essential. We'll cover the latest WCAG guidelines, practical implementation strategies, and tools to help you audit and improve your site's accessibility. Real-world examples demonstrate how to balance aesthetic design with universal usability.",
		userId: 103,
	},
	{
		id: 5,
		title: "Serverless Architecture Patterns",
		body: "Serverless computing has transformed how we build and deploy applications. This post examines common patterns and anti-patterns when working with AWS Lambda, Azure Functions, or Google Cloud Functions. Learn how to architect event-driven systems that scale automatically and optimize for cost.",
		userId: 104,
	},
	{
		id: 6,
		title: "Effective State Management in Modern Applications",
		body: "State management remains one of the most challenging aspects of frontend development. We compare solutions like Redux, MobX, Recoil, and Zustand, analyzing their strengths and weaknesses for different use cases. Practical examples show how to implement each approach in real-world scenarios.",
		userId: 102,
	},
	{
		id: 7,
		title: "GraphQL vs. REST in 2025",
		body: "The debate between GraphQL and REST continues, but the landscape has evolved. This analysis examines the current state of both approaches, considering factors like developer experience, performance, caching strategies, and ecosystem maturity. We'll help you decide which is right for your next project.",
		userId: 103,
	},
	{
		id: 8,
		title: "Containerization Beyond Docker",
		body: "While Docker revolutionized containerization, alternatives have emerged offering unique advantages. This post explores tools like Podman, containerd, and Buildah, highlighting their strengths for different deployment scenarios. Learn how to choose the right containerization strategy for your infrastructure.",
		userId: 104,
	},
	{
		id: 9,
		title: "Testing Strategies for Modern JavaScript",
		body: "Effective testing requires a strategic approach. This guide covers unit, integration, and end-to-end testing methodologies using tools like Jest, Testing Library, and Cypress. We'll demonstrate how to build a comprehensive test suite that provides confidence without becoming a maintenance burden.",
		userId: 101,
	},
	{
		id: 10,
		title: "CI/CD Pipelines for TypeScript Projects",
		body: "Continuous integration and deployment streamline the development lifecycle. This walkthrough demonstrates how to set up efficient CI/CD pipelines specifically optimized for TypeScript projects. Learn how to configure type checking, linting, testing, and deployment across different environments.",
		userId: 103,
	},
];

export let posts: Post[] = [...originalPosts];

export const resetPosts = (): Post[] => {
	posts.length = 0;
	posts.push(...originalPosts);
	return posts;
};

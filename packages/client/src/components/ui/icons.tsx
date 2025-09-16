import type { SVGProps } from "react";

export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Add</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M12 4v16m8-8H4"
		/>
	</svg>
);

export const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Delete</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
		/>
	</svg>
);

export const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Refresh</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
		/>
	</svg>
);

export const ChevronLeftIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>Back</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M15 19l-7-7 7-7"
		/>
	</svg>
);

export const HeartIcon = (props: SVGProps<SVGSVGElement> & { filled?: boolean }) => {
	const { filled, ...svgProps } = props;
	return (
		<svg
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...svgProps}
		>
			<title>Like</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
			/>
		</svg>
	);
};

export const UpvoteIcon = (props: SVGProps<SVGSVGElement> & { filled?: boolean }) => {
	const { filled, ...svgProps } = props;
	return (
		<svg
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...svgProps}
		>
			<title>Upvote</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M5 15l7-7 7 7"
			/>
		</svg>
	);
};

export const DownvoteIcon = (props: SVGProps<SVGSVGElement> & { filled?: boolean }) => {
	const { filled, ...svgProps } = props;
	return (
		<svg
			fill={filled ? "currentColor" : "none"}
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			{...svgProps}
		>
			<title>Downvote</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M19 9l-7 7-7-7"
			/>
		</svg>
	);
};
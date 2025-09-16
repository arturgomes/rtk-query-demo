interface ErrorMessageProps {
	message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
	return (
		<div className="bg-red-100 text-red-700 p-4 rounded-lg">
			{message}
		</div>
	);
};

export default ErrorMessage;
type ErrorsMessagesType = {
    PATH_NOT_FOUND: string;
    USER_NOT_AUTHENTICATED: string;
	INAPROPRIATE_CONTENT: string;
    CONTENT_REQUIRED: string;
    FILE_REQUIRED: string;
    ALL_REQUIRED: string;
    PDF_CONVERT_FAILED: string;
    IMPOSSIBLE_ACTION: string;
    INVALID_LINKEDIN_LINK: string;
    INVALID_GITHUB_LINK: string;
    INVALID_OTHER_LINK: string;
};

const ErrorsMessages: ErrorsMessagesType = {
    PATH_NOT_FOUND: 'Path not found',
	USER_NOT_AUTHENTICATED: 'User not authenticated',
	INAPROPRIATE_CONTENT: 'Inapropriate content',
	CONTENT_REQUIRED: 'Content is required',
	FILE_REQUIRED: 'File is required',
	ALL_REQUIRED: 'All fields are required',
	PDF_CONVERT_FAILED: 'Failed to convert file to pdf',
	IMPOSSIBLE_ACTION: 'Impossible action',
	INVALID_LINKEDIN_LINK: 'Invalid linkedin link',
	INVALID_GITHUB_LINK: 'Invalid github link',
	INVALID_OTHER_LINK: 'Invalid other link',
};

export default ErrorsMessages;

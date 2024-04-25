import { Response } from 'express';
// ---------------------- TYPE DEFINITIONS ---------------------- //
type responseType = Response;
type statusCodeType = number;
type dataTypes = {
	[key: string]:
		| string
		| null
		| number
		| boolean
		| object
		| Array<string | number | boolean | object | null>;
};
// ---------------------- MAIN ---------------------- //
const response = (
	res: responseType,
	statusCode: statusCodeType,
	message: string | undefined,
	data: dataTypes | dataTypes[] | undefined,
	totalPages?: number
) => {
	return res.status(statusCode).json({
		totalPages: totalPages ? totalPages : 1,
		message,
		statusCode,
		status: 'success',
		length: data ? (Array.isArray(data) ? data.length : length) : 0,
		data,
	});
};

// ---------------------- EXPORTS ---------------------- //
export default response;

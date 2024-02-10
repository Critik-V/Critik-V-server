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
	length?: number
) => {
	return res.status(statusCode).json({
		message,
		status: 'success',
		length: data ? (Array.isArray(data) ? data.length : length) : 0,
		data,
	});
};

// ---------------------- EXPORTS ---------------------- //
export default response;

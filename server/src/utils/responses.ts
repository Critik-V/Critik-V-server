import { Response } from 'express';

/**
 * this function is used to send response to the client
 */

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
	data: dataTypes | dataTypes[] | undefined
) => {
	return res.status(statusCode).json({
		message,
		status: 'success',
		data,
	});
};

// ---------------------- EXPORTS ---------------------- //
export default response;

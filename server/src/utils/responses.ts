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
		| number
		| boolean
		| object
		| Array<string | number | boolean | object>;
};
// ---------------------- MAIN ---------------------- //
const response = (
	res: responseType,
	statusCode: statusCodeType,
	data: dataTypes
) => {
	return res.status(statusCode).json({
		status: 'success',
		data,
	});
};

// ---------------------- EXPORTS ---------------------- //
export default response;

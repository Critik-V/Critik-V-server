import { NextFunction, Request, Response } from 'express';

// ---------------------- TYPE DEFINITIONS ---------------------- //
type reqType = Request;
type resType = Response;
type nextType = NextFunction;
type catchAsyncType = (
	fn: (req: reqType, res: resType, next: nextType) => Promise<void>
) => (req: reqType, res: resType, next: nextType) => Promise<void>;
// ---------------------- MAIN ---------------------- //
const catchAsync: catchAsyncType = fn => {
	return async (req: reqType, res: resType, next: nextType) => {
		await fn(req, res, next).catch(next);
	};
};
// ---------------------- EXPORTS ---------------------- //
export default catchAsync;

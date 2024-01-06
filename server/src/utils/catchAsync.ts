import { NextFunction, Request, Response } from "express";

// ---------------------- TYPE DEFINITIONS ---------------------- //
type catchAsyncType = (fn: Function) => Function;
type reqType = Request;
type resType = Response;
type nextType = NextFunction;
// ---------------------- MAIN ---------------------- //
const catchAsync: catchAsyncType = (fn) => {
  return (req: reqType, res: resType, next: nextType) => {
    fn(req, res, next).catch(next);
  };
};
// ---------------------- EXPORTS ---------------------- //
export default catchAsync;

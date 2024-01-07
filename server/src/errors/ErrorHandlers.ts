/**
 * this file contains all the error handlers depending on the environment
 */

// ---------------------- IMPORTS ---------------------- //
import { NextFunction, Request, Response } from "express";
import statusCodes from "../utils/statusCodes";
import Panic from "./Panic";
// ---------------------- TYPE DEFINITIONS ---------------------- //
type errType = Error;
type reqType = Request;
type resType = Response;
type nextType = NextFunction;
// ---------------------- EXPORTS ---------------------- //
export default (err: errType, req: reqType, res: resType, next: nextType) => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
    if (err instanceof Panic) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        operational: err.isOperational,
        stack: err.stack,
      });
    }
  } else if (process.env.NODE_ENV === "production") {
    if (err instanceof Panic) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  }
};

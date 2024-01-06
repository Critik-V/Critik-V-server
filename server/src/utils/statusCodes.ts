/**
 * Object who contains all the status codes we need
*/
// ---------------------- TYPE DEFINITIONS ---------------------- //
type statusCodesType = {
  [key: string]: number;
};
// ---------------------- MAIN ---------------------- //
const statusCodes: statusCodesType = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
// ---------------------- EXPORTS ---------------------- //
export default statusCodes;

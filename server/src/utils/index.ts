import catchAsync from './catchAsync';
import logger from './logger';
import response from './responses';
import statusCodes from './statusCodes';
import apiRoutePrefix from './apiRoutePrefix';
import containsBadWord from './badWords';

const linkedinPattern =
	/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(in)\/([-a-zA-Z0-9]+)\/*/gim;
const githubPattern =
	/^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9_]{1,39})(?!\/)$/gim;
const otherPattern =
	/^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;

export {
	catchAsync,
	logger,
	response,
	statusCodes,
	apiRoutePrefix,
	linkedinPattern,
	githubPattern,
	otherPattern,
	containsBadWord,
};

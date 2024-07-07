// -------------------- CORS -------------------- //
import { CorsOptions } from 'cors';

const originList = [
	`${process.env.PROTOCOL}://${process.env.CLIENT_DOMAIN_NAME}`,
	`${process.env.PROTOCOL}://www.${process.env.CLIENT_DOMAIN_NAME}`,
	`${process.env.PROTOCOL}://${process.env.CLIENT_SERVICE}`,
	`${process.env.PROTOCOL}://${process.env.CLIENT_SERVICE}:${process.env.CLIENT_PORT}`,
];

const corsAllowedHeadersList: string[] = [
	'Content-Type',
	'Authorization',
	'Set-Cookie',
	'Cookie',
	'Access-Control-Allow-Origin',
	'Access-Control-Allow-Credentials',
	'Access-Control-Allow-Headers',
	'Access-Control-Allow-Methods',
];

const corsOptions: CorsOptions = {
	origin: originList,
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: corsAllowedHeadersList,
	credentials: true,
};

export default corsOptions;

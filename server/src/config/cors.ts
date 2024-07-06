// -------------------- CORS -------------------- //
import { CorsOptions } from 'cors';

// const clientOrigin: string = `${process.env.CLIENT_ORIGIN}`;
// const clientService: RegExp = new RegExp(
// 	`^(https?:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*${process.env.CLIENT_SERVICE}(:\d+)?$`,
// 	'gm'
// );
// const domaineName: RegExp = new RegExp(
// 	`^(https?:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*${process.env.CLIENT_DOMAIN_NAME}$`,
// 	'gm'
// );

// const originList: (string | RegExp)[] = [
// 	clientOrigin,
// 	clientService,
// 	domaineName,
// ];

const originList = [
	'http://critik-v.me',
	'http://www.critik-v.me',
	'https://server.critik-v.me',
	'http://localhost:3000',
	'http://localhost',
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

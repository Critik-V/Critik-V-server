// -------------------- CORS -------------------- //
import { CorsOptions } from 'cors';

const domaineName: string = `${process.env.DOMAIN_NAME}`;
const clientOrigin: string = `${process.env.CLIENT_ORIGIN}`;
const clientService: string = `${process.env.CLIENT_SERVICE}`;

const origin = (
	origin: string | undefined,
	callback: (err: Error | null, allow?: boolean) => void
) => {
	if (process.env.NODE_ENV === 'development') {
		callback(null, true);
	} else {
		if (
			origin?.indexOf(domaineName) !== -1 ||
			origin === clientOrigin ||
			origin === clientService
		) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'), false);
		}
	}
};

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
	origin,
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: corsAllowedHeadersList,
	credentials: true,
};

export default corsOptions;

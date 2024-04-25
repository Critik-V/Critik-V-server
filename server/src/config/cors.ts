// -------------------- CORS -------------------- //
import { CorsOptions } from 'cors';

const corsOrginList: string[] = [
	`${process.env.CLIENT_ORIGIN}`,
	'http://localhost:4137',
];

const corsAllowedHeadersList: string[] = ['Content-Type', 'Authorization'];

const corsOptions: CorsOptions = {
	origin: corsOrginList,
	optionsSuccessStatus: 200,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: corsAllowedHeadersList,
};

export default corsOptions;

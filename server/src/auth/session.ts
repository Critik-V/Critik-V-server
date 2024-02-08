import session from 'express-session';

const appSession = session({
	secret: `${process.env.SESSION_SECRET}`,
	resave: true,
	saveUninitialized: true,
});

export default appSession;

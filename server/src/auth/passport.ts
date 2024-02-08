import { db } from '../config';
import ps from 'passport';
import GoogleStrategy from './googleStrategy';

const passport = ps.use(GoogleStrategy);
passport.serializeUser((user, done) => {
	done(null, user);
});
passport.deserializeUser(async (obj: { id: string }, done) => {
	const user = await db.user.findUnique({ where: { id: obj.id } });
	done(null, user);
});

export default passport;

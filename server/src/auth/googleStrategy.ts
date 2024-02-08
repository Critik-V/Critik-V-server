import { Strategy } from 'passport-google-oauth20';
import { db } from '../config';

const GoogleStrategy = new Strategy(
	{
		clientID: `${process.env.GOOGLE_CLIENT_ID}`,
		clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
		callbackURL: `${process.env.GOOGLE_CALLBACK_URL}`,
	},
	async (accessToken, refreshToken, profile, done) => {
		const user = await db.user.findUnique({ where: { oauthId: profile.id } });
		if (!user) {
			const newUser = await db.user.create({
				data: {
					oauthId: profile.id,
					fullname: profile.displayName,
				},
			});
			return done(null, newUser);
		}
		return done(null, profile);
	}
);

export default GoogleStrategy;

import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res, userId) => {

    //create jwt
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

    //Setting the JWT as a Cookie
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});
	return token;
};

    //httpOnly: Prevents the cookie from being accessed by Js, making it more secure against cross-site scripting (XSS) attacks.
    //secure: Sets the cookie to be sent only over HTTPS in production environments, enhancing security.
    //sameSite: Sets the cookie to be sent only with requests from the same origin, preventing cross-site request forgery (CSRF) attacks.
    //maxAge: Sets the maximum age of the cookie to 7 days, after which it will expire. 
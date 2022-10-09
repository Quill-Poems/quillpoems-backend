const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config')
const { UnauthorizedError } = require('../utils/errors')
function jwtFrom({ headers }){
    if (headers?.authorization) {
        const [scheme, token] = headers.authorization.split(" ");
        if (scheme.trim() == "Bearer"){
            return token.trim();
        }
    }

    return undefined
}

const extractUserFromJwt = (req, res, next) => {
	try {
		const token = jwtFrom(req);
		if (token) {
			res.locals.user = jwt.verify(token, SECRET_KEY);
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

const requireAuthenticatedUser = async (req, res, next) => {
	try {
		const { user } = res.locals;
		const { author, username } = req.params;
		if (author != undefined){
			if (author != user.username){
				throw new UnauthorizedError("Author - User authentication failed");
			}
		}
		if (username != undefined){
			if (username != user.username){
				throw new UnauthorizedError("Username - User authentication failed");
			}
		}

		if (!user?.email) {
			throw new UnauthorizedError("3- User authentication failed");
		}
		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = {
	jwtFrom,
	extractUserFromJwt,
	requireAuthenticatedUser,
};
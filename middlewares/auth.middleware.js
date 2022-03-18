const authService = require('../services/auth.service');

/**
 * AuthMiddleware
 */
class AuthMiddleware {
    constructor() {
        this.authData = {};
    }

    /**
     * Verify Access Token
     * Passing auth data whenever access_token is expired
     * Getting Access token for the first time
     */
    verifyAccessToken = async (req, res, next) => {
        // not a correct approach, however in this particular case we need to always be authorized
        try {
            if (!this.authData.access_token || (this.authData.access_token
                && Date.now() >= this.authData.expires_in * 1000)) {

                const {data} = await authService.getAccessToken();

                this.authData = {...data};
                req.access_token = data.access_token;
            } else {
                req.access_token = this.authData.access_token;
            }

            next();

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthMiddleware();
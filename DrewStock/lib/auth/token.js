const jwt = require('jsonwebtoken');

const secret = process.env.APP_SECRET;


module.exports = {

    sign(user) {
        return new Promise( (resolve, reject) => {

            // This is the data (Public Claims) we want stored in the token
            const payload = {
                id: user.id,
                roles: user.roles
            };
            // Create a token with payload and use secret
            jwt.sign(payload, secret, null, (err, token ) => {
                // If there's an error...
                if (err) return reject(err);
                // Otherwise, return the new token
                resolve(token);
            });
        });
    },

    verify(token) {

        return new Promise( (resolve, reject) => {

            jwt.verify(token, secret, (err, payload) => {
                // If there's an issue with the token (invalid or expired)...
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }

};

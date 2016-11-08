'use strict';

const jwt = require('jsonwebtoken');
const tkn = process.env.APP_SECRET || 'app-tkn';

module.exports = {
    sign(user) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: user._id,
                roles: user.roles
            };

            jwt.sign(payload, tkn, null, (err, token) => {
                if (err) return reject(err);
                resolve(token);
            });
        });
    },
    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, tkn, (err, payload) => {
                if (err) return reject(err);
                resolve(payload);
            });
        });
    }
};
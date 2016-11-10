'use strict';

const jwt = require('jsonwebtoken');
const secret = process.env.APP_SECRET || 'app-secret';

module.exports = {
    sign(user) {
        return new Promise((resolve, reject) => {
            const payload = {
                id: user._id,
                roles: user.roles
            };
            
            jwt.sign(payload, secret, null, (error, token) => {
                if(error) return reject(error);
                resolve(token);
            });
        });
    },
    verify(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (error, payload) => {
                if(error) return reject(error);
                resolve(payload);
            });
        });
    }
};

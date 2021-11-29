const crypto = require('crypto');
const moment = require('moment');

exports.createActivationToken = () =>
    crypto
    .createHash('sha256')
    .update('groupomania_activation_Qes9JYmDMD')
    .update(
        moment()
        .unix()
        .toString(),
    )
    .update(crypto.randomBytes(8))
    .digest('hex');

exports.createResetToken = () =>
    crypto
    .createHash('sha256')
    .update('groupomania_reset_hrkeOU7JrI')
    .update(
        moment()
        .unix()
        .toString(),
    )
    .update(crypto.randomBytes(8))
    .digest('hex');

exports.hashPassword = password =>
    crypto
    .createHash('sha256')
    .update('groupomania_password_41Bkd3RFPu')
    .update(password)
    .digest('hex');

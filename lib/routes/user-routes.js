const router = require('express').Router();

const User = require('../models/user-schema');

module.exports = router
    .get('/', (req, res, next) => {
        User.find()
            .select('-hash -email')
            .lean()
            .then(users => res.send(users))
            .catch(next);
    });
process.env.MONGODB_URI = 'mongodb://localhost:27017/shopper-test';
require('../lib/connection');
const mongoose = require('mongoose');

before(() => mongoose.connection.dropDatabase());

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../lib/app');
const request = chai.request(app);

// duplicate code, refactor to function...

function signup(user) {

    before(() => {
        return request.post('/signup')
            .send(user);
            // this isn't doing anything...
            // .then(data => {
            //     return data;
            // })
            // this will suppress any errors, just let mocha handle
            // and test will fail correctly on error.
            // .catch();
    });
}

signup({
    name: 'me',
    email: 'me@email.com',
    password: 'mepwd'
});

signup({
    name: 'you',
    email: 'you@email.com',
    password: 'youpwd'
});
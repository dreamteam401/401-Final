const assert = require('chai').assert;
const Store = require('../../lib/models/store-schema');
const testInvalid = require('./test-invalid')(Store);
const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
mongoose.Promise = Promise;

describe('store schema', () => {
    it('requires name', () => {
        return testInvalid({ brand: 'Kroger' });
    });
    it('requires brand', () => {
        return testInvalid({ price: '$3.88' });
    });
    it('requires price', () => {
        return testInvalid({ name: 'Fred Meyer' });
    });
    it('is valid with name, brand, and price', () => {
        return new Store({ name: 'Fred Meyer', brand: 'Kroger', price: '$3.88', size: '32' }).validate();
    });

    // this test isn't doing anything above test is doing...
    // it('example data with all fields', () => {
        

    // this test is testing mongoose, not your code...
    // it('checks to see if this object is the same as the data we have', () => {
    
});
const List = require('../../lib/models/list-schema');
const testInvalid = require('./test-invalid')(List);

describe.skip('list schema', () => {
    it('requires name', () => {
        return testInvalid({ email: 'chlaw101@gmail.com' });
    });
});
const router = require('express').Router();
const bodyParser = require('body-parser').json();
const Account = require('../models/account-schema');
const ensureRole = require('../auth/ensure-role');

router
    .post('/', bodyParser, ensureRole('owner'), (req, res, next) => {
        new Account(req.body).save()
            .then(accounts => res.send(accounts))
            .catch(next);
    })
    // url path parts describe resources (nouns), and should not be commands
    .post('/:id/members', bodyParser, ensureRole('owner'), (req, res, next) => {
        return Account.findById(req.params.id)
            .then(account => {
                const validUser = account.members.find(m => m.user === req.user.id && m.role === 'owner');
                if(!validUser) throw { code: 401, error: 'some error'};
                account.members.push(req.body);
                return account.save();
            })
            .then(list => res.send(list))
            .catch(next);
    })
    .post('/:id/lists', bodyParser, ensureRole('owner'), (req, res, next) => {
        return Account.findById(req.params.id)
            .then(account => {
                account.list.push(req.body.list_id);
                return account.save();
            })
            .then(list => res.send(list))
            .catch(next);
    })
    .delete('/:id/members/:userId', bodyParser, ensureRole('owner'), (req, res, next) => {
        return Account.findById(req.params.id)
            .then(account => {
                const newAccount = account.members.filter(x => x.user != req.params.userId);
                account.members = newAccount;
                return account.save();
            })
            .then(account => res.send(account))
            .catch(next);
    })
    .post('/:id/list/:listId', bodyParser, ensureRole('owner'), (req, res, next) => {
        return Account.findById(req.params.id)
            .then(account => {
                const newAccount = account.list.filter(x => x != req.params.listId);
                account.list = newAccount;
                return account.save();
            })
            .then(account => res.send(account))
            .catch(next);
    })
    .get('/', (req, res, next) => {
        Account.find()
            .lean()
            // Using longer format for populate so you can remove '-hash'
            .populate('list', 'members.user') 
            .then(accounts => res.send(accounts))
            .catch(next);
    })
    .get('/:id', (req, res, next) => {
        Account.findById(req.params.id)
            .lean()
            // Using longer format for populate so you can remove '-hash'
            .populate('list', 'members.user')
            .then(account => {
                if (!account) {
                    res.status(404).send({ error: 'Account not found' });
                } else {
                    // not sure why your putting this in response headers.
                    // might be okay, hard to know without context
                    res.set('Role', account.members.role)
                        .send(account);
                }
            })
            .catch(next);
    })
    .delete('/:id', ensureRole('owner'), (req, res, next) => {
        Account.findByIdAndRemove(req.params.id)
            .then(deleted => res.send({ deleted: !!deleted }))
            .catch(next);
    });

module.exports = router;
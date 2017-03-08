module.exports = function getEnsureRole(role) {
    return function ensureRole(req, res, next) {
        // none of these are acceptable ways to get the user's role,
        // as all of them can be spoofed by the person making the call.
        const reqRole = req.params.role || req.get('role') || req.query.role;

        // Either fetch the role from the db basedon the userid of the token,
        // or add the role to the token payload
        if (reqRole === role) {
            next();
        } else next({
            code: 403,
            error: 'unauthorized role'
        });
    };
};
const isAdmin = (req, res, next) => {
    if (req.session?.user?.type == 'admin') {
        return next();
    }

    res.redirect('/');
}

module.exports = {
    isAdmin
}

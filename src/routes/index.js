const routes = require('express').Router(), 
accountRouter = require('./account')

routes.use('/api/UBER-EEDSI/account', accountRouter);

module.exports = routes;
const routes = require('express').Router(), 
accountRouter = require('./account')

routes.use('/UBER-EEDSI/account', accountRouter);

module.exports = routes;
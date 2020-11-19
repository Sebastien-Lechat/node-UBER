const routes = require('express').Router(), 
accountRouter = require('./account'),
historyRouter = require('./history')

routes.use('/api/UBER-EEDSI/account', accountRouter);
routes.use('/api/UBER-EEDSI/history', historyRouter);

module.exports = routes;
const routes = require('next-routes');

module.exports = routes()
    .add('/gatherings/create', '/gatherings/create')
    .add('/gatherings/show/:address', '/gatherings/show')
    ;
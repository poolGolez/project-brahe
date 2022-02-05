const routes = require('next-routes');

module.exports = routes()
    .add('/gatherings/:address', '/gatherings/show')
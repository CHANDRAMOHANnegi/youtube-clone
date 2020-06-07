// const authResolver = require('./auth');
const userResolver = require('./user');

const rootResolver = {
     ...userResolver
};

module.exports = rootResolver;
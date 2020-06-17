// const authResolver = require('./auth');
const userResolver = require('./user');
const videoResolver = require('./videos');

const rootResolver = {
     ...userResolver,
     ...videoResolver
};

module.exports = rootResolver;
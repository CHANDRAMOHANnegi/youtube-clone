// const authResolver = require('./auth');
const userResolver = require('./user');
const videoResolver = require('./videos');
const commentResolver = require('./comment');
 
const rootResolver = {
     ...userResolver,
     ...videoResolver,
     ...commentResolver
};

module.exports = rootResolver;
// const authResolver = require('./auth');
const userResolver = require('./user');
const videoResolver = require('./videos');
const commentResolver = require('./comment');
const likeResolver = require('./like');
 
const rootResolver = {
     ...userResolver,
     ...videoResolver,
     ...commentResolver,
     ...likeResolver,
};

module.exports = rootResolver;
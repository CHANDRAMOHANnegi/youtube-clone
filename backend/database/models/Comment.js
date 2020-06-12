const Sequelize = require('sequelize');
const sequelize = require('../connection/connecton');

module.exports = sequelize.define('comment', {
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String
    }
},
    {
        timestamps: true,
        freezeTableName: true
    }
);

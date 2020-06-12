const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = sequelize.define('like', {
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }

}, { timestamps: true, freezeTableName: true })


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = sequelize.define('video', {
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, freezeTableName: true })



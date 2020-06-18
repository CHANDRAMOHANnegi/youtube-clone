const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = sequelize.define('Subscriber', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true, freezeTableName: true })



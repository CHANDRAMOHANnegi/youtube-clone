
'use strict';
module.exports = function (sequelize, Sequelize) { 
const Dislike = sequelize.define('Dislike', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
//     // userId: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User'
//     // },
//     // commentId: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Comment'
//     // },
//     // videoId: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Video'
//     // }
}, { timestamps: true, 
    // freezeTableName: true 
});

return Dislike;
};
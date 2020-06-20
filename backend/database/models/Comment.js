module.exports = (sequelize, Sequelize) => {

const Comments= sequelize.define('Comments', {
//     id: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.UUID,
//         defaultValue: Sequelize.UUIDV4
//     },
//     // writer: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User'
//     // },
//     // postId: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Video'
//     // },
//     // responseTo: {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'User'
//     // },
//     content: {
//         type: Sequelize.STRING
//     }
},
    {
        timestamps: true,
        // freezeTableName: true
    }
);

return Comments;
};
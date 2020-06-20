  

'use strict';
module.exports = function (sequelize, Sequelize) {

const Subscriber = sequelize.define('Subscriber', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
//     // userTo: {
       
//     //     ref: 'User'
//     // },
//     // userFrom: {
         
//     //     ref: 'User'
//     // }
}, { timestamps: true,
    //  freezeTableName: true
     })
 return Subscriber;

};
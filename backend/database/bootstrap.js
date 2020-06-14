// module.exports = async () => {

//     const Question = require('./models/Question');
//     const User = require('./models/User');

//     User.hasMany(Question, { as: "Question", foreignKey: 'userId' });
//     Question.belongsTo(User, { as: "User", foreignKey: "userId" })

//     const errorHandler = (err) => {
//         console.log('error====>', err);
//     }

//     const user = await User.create({
//         name: "cm", email: "cm@cm.com", password: "12345678"
//     }).catch(errorHandler);

//     // console.log(user);

//     const question = await Question.create({
//         content: "this is already the question",
//         userId: user.id
//     }).catch(errorHandler);
//     // console.log(question);

//     const users = User.findAll({
//         where: { email: "cm@cm.com" }, include:
//             [{ model: Question, as: "Question" }]
//     }).catch(errorHandler)
 
// }
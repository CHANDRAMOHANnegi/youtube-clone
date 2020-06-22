


const User = require('./models').User;
const Video = require('./models').Video;


module.exports = async () => {


    const errorHandler = (err) => {
        console.log('error====>', err);
    }

    // User.bulkCreate([
    //     { email: "cm@cm.com", password: "12345678", firstname: "cm", lastname: "cc" },
    //     { email: "c@cm.com", password: "12345678", firstname: "m", lastname: "cc" },
    //     { email: "cm@c.com", password: "12345678", firstname: "c", lastname: "cc" }
    // ]).then(user => {
    //     console.log("=============", user);
    // }).catch((err) => {
    //     console.log("Error while user creation : ", err)
    // })

    // Video.bulkCreate([
    //     { title: 'john-doe@domain.com', filePath: 'John', category: '0', userId: '4e0cd4b5-43b0-4ba9-bede-a9c2792df54b' },
    //     { title: 'john-de@domain.com', filePath: 'Jhn', category: '1', userId: '4e0cd4b5-43b0-4ba9-bede-a9c2792df54b' },
    //  { title: 'john-doe@dmai.com', filePath: 'Joh', category: '2', userId: '3077730f-a502-4f94-a9f0-ee248317effa' }
    // ]).then((newUsers) => {
    //     console.log(newUsers)
    // }).catch((err) => {
    //     console.log("Error while users creation : ", err)
    // })

    
    Video.findAll({
         include:
            { model: User, as: 'writer',attributes:['firstname','lastname','image'] }
    }).then(data => {
        console.log(JSON.stringify(data, null, 2));
    }).catch(errorHandler)

}
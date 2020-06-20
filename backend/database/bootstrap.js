


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
    //     { title: 'john-doe@domain.com', filePath: 'John', category: '0', userId: 'f9ed0614-7982-4ce1-ac9a-5890fd8a3da2' },
    //     { title: 'john-de@domain.com', filePath: 'Jhn', category: '1', userId: 'e147e15d-56c1-447b-b6a9-5225515717ce' },
    //  { title: 'john-doe@dmai.com', filePath: 'Joh', category: '2', userId: 'e147e15d-56c1-447b-b6a9-5225515717ce' }
    // ]).then((newUsers) => {
    //     console.log(newUsers)
    // }).catch((err) => {
    //     console.log("Error while users creation : ", err)
    // })

    Video.findAll({
        // where: { filePath: 'John' },
        include:
            { model: User }
    }).then(data => {
        console.log(JSON.stringify(data, null, 2));
    }).catch(errorHandler)

}
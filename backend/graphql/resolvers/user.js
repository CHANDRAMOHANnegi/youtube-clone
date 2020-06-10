const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const multer = require('multer');

const Question = require('../../database/models/Question');
const User = require('../../database/models/User');

const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dksme2kao',
    api_key: '359145757282132',
    api_secret: 'mA4OeukQz_rmXJtVdN9pPGlDSas',
});

module.exports = {
    createUser: async (args) => {
        try {
            const { email, name, lastname, password } = args.userInput;
            const existingUser = await User.findOne({
                where: { email: email }
            });
            if (existingUser) {
                throw new Error("user already exist")
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                email,
                password: hashedPassword,
                name,
                lastname,
            })
            const result = await user.save();
            return {
                id: result.dataValues.id,
                email,
                name,
                lastname,
                createdAt: result.dataValues.createdAt
            }
        } catch (error) {
            console.log("====>", error);
        }
    },
    login: async ({ email, password }) => {

        console.log("-----<", email, password);

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("user does not exist")
        }
        const isequal = await bcrypt.compare(password, user.password);
        if (!isequal) {
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({
            userId: user.id,
            email: email
        }, 'secretKey', { expiresIn: '1h' });
        return {
            userId: user.id,
            token,
            tokenExp: 12
        }
    },
    addPhoto: async (args, req) => {
        console.log(args);
        let { filename, mimetype } = args.file;
        console.log({ filename, mimetype });
        const { email } = req.user;

        User.update({ image: filename },
            { where: { email } })
            .then((data) => {
                if (data[0] > 0) {
                    const path = require('path');
                    const mainDir = path.dirname(require.main.filename);
                    filename = `${mainDir}/uploads/${filename}`;
                    console.log(filename);
                    try {
                        cloudinary.v2.uploader.upload(filename).then(photo => {
                            console.log(photo);
                            return true;
                        }).catch(err => {
                            console.log(err);
                        });
                    } catch (error) {
                        throw new Error(error)
                    }
                }
            }).catch(err => {
                console.log("----------------->>>>>>>>>>>>", err);
                throw new Error(err);
            });
    }
};


//   asset_id: '239277f93bf0c9dc0211210c77c4dafd',
//   public_id: 'gn4tz1x5ltv0vvwbxhoj',
//   version: 1591735228,
//   version_id: 'bc1b9577c17f00a812e76f12e644176e',
//   signature: '4586577c977e2bc8857ec6845230b04dafd8827c',
//   width: 416,
//   height: 603,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2020-06-09T20:40:28Z',
//   tags: [],
//   bytes: 232138,
//   type: 'upload',
//   etag: 'f450612d53b5b67f1dd986ff86b4a801',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dksme2kao/image/upload/v1591735228/gn4tz1x5ltv0vvwbxhoj.png',
//   secure_url: 'https://res.cloudinary.com/dksme2kao/image/upload/v1591735228/gn4tz1x5ltv0vvwbxhoj.png',
//   original_filename: 'road'
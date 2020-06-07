const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const multer = require('multer');

const Question = require('../../src/models/Question');
const User = require('../../src/models/User');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("-------------->>>>>>>>>>>>>>>>>.--");

        // console.log(req.body, file);
        let dir = `./src/uploads/${req.body.userHandle}`;
        fs.exists(dir, exist => {
            if (!exist) return fs.mkdir(dir, error => cb(error, dir));
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        console.log("->>>>>>>>>>>>>>>>.--");

        cb(null, new Date().toISOString() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {

    console.log("----------------");

    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter
}).single('userImage');



const storeFS = ({ stream, filename }) => {
    const uploadDir = '../backend/photos';
    const path = `${uploadDir}/${filename}`;
    return new Promise((resolve, reject) =>
        stream
            .on('error', error => {
                if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(path);
                reject(error);
            })
            .pipe(fs.createWriteStream(path))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ path }))
    );
}


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
            tokenExp: 1
        }
    },
    addPhoto: async (args, req, res) => {
        console.log(args);
        const { filename, mimetype } = args.file;
        const { email } = req.user;

        console.log(res);
        

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                throw new Error('error')
            } else if (err) {
                console.log("------?", err);
                throw new Error('error')
            }

            User.update({ image: filename },
                { where: { email } })
                .then((data) => {
                    console.log("00000000000000", data);
                    return {
                        fileLocation: filename
                    };
                }).catch(err => {
                    console.log("----------------->>>>>>>>>>>>", err);
                    throw new Error('error')
                })

                //  const { filename, mimetype, createReadStream } = await args.file;
                // const stream = createReadStream();
                // const pathObj = await storeFS({ stream, filename });
                // const fileLocation = pathObj.path;
                // const photo = await models.Photo.create({
                //     fileLocation,
                //     description,
                //     tags
                // })
                // return photo
        });
    }
};
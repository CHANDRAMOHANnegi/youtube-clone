const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const multer = require('multer');

const Question = require('../../src/models/Question');
const User = require('../../src/models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body, file);
        let dir = `./uploads/${req.body.userHandle}`;
        fs.exists(dir, exist => {
            if (!exist) return fs.mkdir(dir, error => cb(error, dir));
            return cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
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

exports.uploadImage = (req, res) => {
    console.log(req.body);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        User.findOneAndUpdate({ userHandle: req.body.userHandle }, { userImage: req.file.path })
            .then((data) => {
                return res.json({
                    success: true,
                    user: data
                });
            }).catch(err => {
                return res.json({
                    success: true,
                    user: user
                });
            })
    });
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
    addPhoto: async (args, req) => {
        console.log(args, req.user);
        const { filename, mimetype, encoding } = args;
        const { email } = req.user;

        upload(filename, mimetype, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err)
            } else if (err) {
                return res.status(500).json(err)
            }
            User.findOneAndUpdate({ email }, { image: filename })
                .then((data) => {
                    return res.json({
                        success: true,
                        user: data
                    });
                }).catch(err => {
                    return res.json({
                        success: true,
                        user: user
                    });
                })
        });
    }
};
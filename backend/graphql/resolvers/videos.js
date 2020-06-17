const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const multer = require('multer');

// const Question = require('../../database/models/Question');
const Video = require('../../database/connection/connecton').Video;
const User = require('../../database/connection/connecton').User;

module.exports = {
    getVideos: async () => {
        try {
          
          
            let data = await User.findAll({
                include:  Video
            });

            console.log(data);
            

            // let data = await Video.findAll({
            //     include:  User,as:'User'
            // });

            // console.log(data);
            

            if (!data) {
                throw new Error("error in finding videos")
            };
            if (data) {
                // data = data.map(video => {
                //     return video.dataValues;
                // });
                console.log("==============???", data);
                return data;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
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
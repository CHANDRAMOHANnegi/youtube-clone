
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;

module.exports = {
    getVideos: async () => {
        try {
            let videos = await Video.findAll({
                include: {
                    model: User,
                    include: {
                        model: Comment
                    },
                    as: 'writer',
                    attributes: [
                        'firstname',
                        'lastname',
                        'image'
                    ]
                }
            });
            if (videos) {
                console.log((JSON.stringify(videos, null, 2)));
                return JSON.parse(JSON.stringify(videos, null, 2));
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getVideo: async ({ videoId }) => {
        try {
            const video = await Video.findOne({
                where: { id: videoId },
                include: { model: User, include: { model: Comment }, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
            });

            console.log(video);

            if (video)
                return video.dataValues;

        } catch (error) {
            console.log(error);
            return error;
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

const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Subscribe = require('../../database/models').Subscribe;

module.exports = {
    subscribed: async ({ userTo, userFrom }) => {
        // console.log(args);
        try {

            let subscribe = await Subscriber.findOne({ where: { userTo, userFrom } });

            console.log(subscriber);

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            return { success: true, subcribed: result }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    subscribe: async ({ userTo, userFrom }) => {
        // console.log(args);
        try {
            let subscribe = new Subscriber({ userTo, userFrom });

            console.log(subscriber);

            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            return { success: true }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },



    // getcomments: async () => {
    //     try {
    //         let videos = await Video.findAll({
    //             include:
    //                 { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
    //         });
    //         if (videos) {
    //             // console.log(JSON.parse(JSON.stringify(videos, null, 2)));
    //             return JSON.parse(JSON.stringify(videos, null, 2));
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         return err;
    //     }
    // },
    // getComment: async ({ videoId }) => {
    //     try {
    //         const video = await Video.findOne({
    //             where: { id: videoId },
    //             include: { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
    //         });
    //         if (video)
    //             return video.dataValues;

    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }
};


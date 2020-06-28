
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Subscriber = require('../../database/models').Subscriber;

module.exports = {
    subscribed: async ({ userTo, userFrom }) => {
        // console.log(args);
        try {

            let subscribe = await Subscribe.findOne({ where: { userTo, userFrom } });

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
    subscribe: async (args) => {

        console.log(args);
        

        const { userId, subscriberId } = args.subscribeInput;
        console.log("-------------------------------------------", { userId, subscriberId });

        try {
            let subscriber = new Subscriber({  userId, subscriberId });

            console.log("////------------------", subscriber);

            if (subscriber) {
                let res = await subscriber.save()
                console.log(res);
            }

            let result = false;
            if (subscriber.length !== 0) {
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


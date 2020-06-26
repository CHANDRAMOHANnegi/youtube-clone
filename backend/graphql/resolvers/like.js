
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Like = require('../../database/models').Like;

module.exports = {

    upLike: async (args) => {
        console.log('.........>>>>>  ', args);
        try {
            const { userId, videoId, commentId } = args.likeInput;
            let variables = {};
            if (videoId) {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }

            // console.log(variables);

            let like = await Like.findOne({ where: variables });
            console.log('/////////////////////', like);
            if (!like) {
                like = new Like(variables);
            };

            console.log('-----------------------', like);
            const result = await like.save();
            console.log(JSON.stringify(result));
            return {
                id: result.dataValues.id,
            }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },

    unLike: async (args) => {
        console.log('.........>>>>>  ', args);
        try {
            const { userId, videoId, commentId } = args.likeInput;
            let variables = {};
            if (videoId) {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }
            let like = await Like.destroy({
                where: variables
            })
                .then(res => {
                    console.log(res);

                }).catch(err => console.log(err))

            console.log('-----------------------', like);
            return {
                id: like.dataValues.id,
            }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    getLikes: async (args) => {
        console.log("-------->", args);

        try {
            const { userId, videoId, commentId } = args.likeInput;

            let variables = {};
            if (videoId) {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }
            let likes = await Like.findAll(variables);
            if (likes) {
                console.log('==========');

                console.log(likes);
                likes = likes.map(like => {
                    return {
                        id: like.dataValues.id,
                        userId: like.dataValues.userId
                    }
                })
                console.log(likes);

                return likes//JSON.parse(JSON.stringify(likes, null, 2)).length;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },


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


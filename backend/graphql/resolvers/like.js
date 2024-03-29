
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;
const Like = require('../../database/models').Like;
const Dislike = require('../../database/models').Dislike;

module.exports = {

    upLike: async (args, req) => {


        try {
            // console.log("--------------------->>>>>>>>>>>>>", req.isAuth, req.user);
            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }

            // console.log('.........>>>>>  ', args);
            const { userId, videoId, commentId } = args.likeInput;
            let variables = {};

            if (videoId != 'undefined') {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }

            console.log(variables);

            let like = new Like(variables);

            // console.log('-----------------------', like);
            const result = await like.save();
            if (result) {
                await Dislike.destroy({ where: variables })
            }
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


        try {
            // console.log("--------------------->>>>>>>>>>>>>", req.isAuth, req.user);

            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }

            const { userId, videoId, commentId } = args.likeInput;

            // console.log("--------------------------------", videoId);

            let variables = {};
            if (videoId != 'undefined') {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }
            let like = await Like.destroy({
                where: variables
            });
            if (like)
                // console.log('-----------------------', like);
            return like
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    upDisLike: async (args) => {
        // console.log('.........>>>>>  ', args);
        try {

            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }

            const { userId, videoId, commentId } = args.likeInput;
            let variables = {};
            if (videoId != 'undefined') {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }

            let dislike = new Dislike(variables);

            let result = await dislike.save();

            if (result) {
                let like = await Like.destroy({ where: variables });
                console.log(like);
            }
            return {
                id: result.dataValues.id,
            }
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },

    unDisLike: async (args) => {
        console.log('.>>>>>  ', args);
        try {

            if (!req.isAuth) {
                throw new Error('Unauthenticated!');
            }

            const { userId, videoId, commentId } = args.likeInput;
            let variables = {};
            if (videoId != 'undefined') {
                variables = { userId, videoId };
            } else {
                variables = { userId, commentId }
            }
            let dislike = await Dislike.destroy({
                where: variables
            });
            // if (like)
            console.log('-----------------------', dislike);
            return dislike
        } catch (err) {
            console.log('=========', err);
            return err;
        }
    },
    getLikes: async (args) => {
        // console.log("-------->", args);

        try {
            const { videoId, commentId } = args.likeInput;
            let variables = {};

            if (videoId != 'undefined') {
                variables = { videoId };
            } else {
                variables = { commentId };
            }
            let likes = await Like.findAll({ where: variables });
            if (likes) {
                // console.log('==========');
                // console.log(likes);
                likes = likes.map(like => {
                    return {
                        id: like.dataValues.id,
                        userId: like.dataValues.userId
                    }
                })
                // console.log(likes);
                return likes//JSON.parse(JSON.stringify(likes, null, 2)).length;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },

    getDislikes: async (args) => {
        // console.log("-------->", args);

        try {
            const { videoId, commentId } = args.likeInput;
            let variables = {};

            if (videoId != 'undefined') {
                variables = { videoId };
            } else {
                variables = { commentId };
            }
            let dislikes = await Dislike.findAll({ where: variables });
            if (dislikes) {
                // console.log('==========');
                // console.log(dislikes);
                dislikes = dislikes.map(dislike => {
                    return {
                        id: dislike.dataValues.id,
                        userId: dislike.dataValues.userId
                    }
                })
                // console.log(dislikes);
                return dislikes//JSON.parse(JSON.stringify(likes, null, 2)).length;
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};


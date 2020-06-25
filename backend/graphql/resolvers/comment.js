
const Video = require('../../database/models').Video;
const User = require('../../database/models').User;
const Comment = require('../../database/models').Comment;

module.exports = {

    createComment: async (args) => {
        console.log("=================================");

        console.log(args);

        try {
            const { userId, videoId, content } = args.commentInput;

            const existingUser = await Comment.findOne({
                where: { userId, videoId }
            });

            console.log(existingUser);


            if (existingUser) {
                const error = new Error("user already exist");
                throw error;
            }

            const comment = new Comment({
                userId, videoId, content
            });

            console.log(comment);


            const result = await user.save();

            console.log(result);

            return {
                id: result.dataValues.id,
                content,
                createdAt: result.dataValues.createdAt,
            }

        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getcomments: async () => {
        try {
            let videos = await Video.findAll({
                include:
                    { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
            });
            if (videos) {
                console.log(JSON.parse(JSON.stringify(videos, null, 2)));
                return JSON.parse(JSON.stringify(videos, null, 2));
            }
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    getComment: async ({ videoId }) => {
        try {
            const video = await Video.findOne({
                where: { id: videoId },
                include: { model: User, as: 'writer', attributes: ['firstname', 'lastname', 'image'] }
            });
            if (video)
                return video.dataValues;

        } catch (error) {
            console.log(error);
            return error;
        }
    }
};


const { buildSchema } = require('graphql');
const videoSchema = require('./videoSchema');
const userSchema = require('./userSchema');
const CommentSchema = require('./CommentSchema');
const LikeSchema = require('./LikeSchema');

module.exports = buildSchema(`
        
    ${userSchema}

    ${videoSchema}

    ${CommentSchema}

    ${LikeSchema}

    type Success{
        success:Boolean
    }

    type RootQuery{

        login(email:String!,password:String!):AuthData!

        getVideos:[Video]
        getVideo(videoId:String!):Video

        getLikes(likeInput:LikeInput):[Like]
        
    }

    type RootMutation{
        
        createUser(userInput:UserInput!):User
        
        addPhoto(image: File!): Photo
        uploadVideo(video:File):Video
        
        createComment(commentInput:CommentInput!):Comment

        upLike(likeInput:LikeInput):Like
        unLike(likeInput:LikeInput):Int

        upDisLike(likeInput:LikeInput):Like
        unDisLike(likeInput:LikeInput):Int

        subscribe(userTo:String!,userFrom:String!):Success

    }
    
    schema{

        query:RootQuery
        mutation:RootMutation

    }

`);

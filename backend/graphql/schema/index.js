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


    type RootQuery{

        login(email:String!,password:String!):AuthData!
        getVideos:[Video]
        getLikes(likeInput:LikeInput):[Like]
        getVideo(videoId:String!):Video
        
    }

    type RootMutation{
        createUser(userInput:UserInput!):User
        
        addPhoto(image: File!): Photo
        uploadVideo(video:File):Video
        
        createComment(commentInput:CommentInput!):Comment

        upLike(likeInput:LikeInput):Like
        unLike(likeInput:LikeInput):Like

    }
    
    schema{
        query:RootQuery
        mutation:RootMutation
    }

`);

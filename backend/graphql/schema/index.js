const { buildSchema } = require('graphql');
const videoSchema = require('./videoSchema');
const userSchema = require('./userSchema');
const CommentSchema = require('./CommentSchema');

module.exports = buildSchema(`
        
    ${userSchema}

    ${videoSchema}

    ${CommentSchema}

    type RootQuery{

        login(email:String!,password:String!):AuthData!
        getVideos:[Video]
        getVideo(videoId:String!):Video
        
    }
    
    type RootMutation{
        createUser(userInput:UserInput!):User
        addPhoto(image: File!): Photo
        uploadVideo(video:File):Video
        createComment(commentInput:CommentInput!):Comment
    }

    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);

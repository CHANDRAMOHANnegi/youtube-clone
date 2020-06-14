const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type User {
        id:ID!,
        email:String!,
        firstname:String!,
        lastname:String!,
        createdAt:String!,
      
     }

    input UserInput{
        email:String!,
        password:String!,
        firstname:String!,
        lastname:String,
     }

    type AuthData {
        userId: ID!,
        token: String!,
        tokenExp: Int!,
        firstname:String!,
        lastname:String,
        email:String!,
        role:Int!,
        image:String
    }

    input File {
        filename: String!
        mimetype: String!
    }

    type Photo {
        url: String!,
        filename:String!,
        format:String!,
    }

    type Video {
        url: String!,
        title:String!,
        description:String!,
        category: String!
        thumbnail: String!
        filename:String!,
        format:String!
    }

    type RootQuery{
        login(email:String!,password:String!):AuthData!
    }
    
    type RootMutation{
        createUser(userInput:UserInput!):User
        addPhoto(image: File!): Photo
        uploadVideo(video:File):Video
    }

    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);

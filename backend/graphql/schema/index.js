const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type User {
        id:ID!,
        email:String!,
        firstname:String!,
        lastname:String!,
        createdAt:String!
     }

    input UserInput{
        email:String!,
        password:String!,
        firstname:String!,
        lastname:String,
        image:String
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

    type RootQuery{
     login(email:String!,password:String!):AuthData!
    }
    
    type RootMutation{
        createUser(userInput:UserInput!):User
        addPhoto(file: File!): Photo
    }

    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);

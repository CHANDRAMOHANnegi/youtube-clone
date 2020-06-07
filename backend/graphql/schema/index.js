const { buildSchema } = require('graphql');
const gql = require('graphql-tag');
const graphql = require('graphql');

// const {
//     GraphQLObjectType,
//     GraphQLSchema,
//     GraphQLString,
//     GraphQLID,
//     GraphQLInt
// } = graphql;

module.exports = buildSchema(`
 
    type User {
        id:ID!,
        email:String!,
        name:String!,
        lastname:String!,
        createdAt:String!
     }

    input UserInput{
        email:String!,
        password:String!,
        name:String!,
        lastname:String,
        image:String
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExp: Int!
    }

    input File {
        filename: String!
        mimetype: String!
       }

    type Photo {
        fileLocation: String,
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


// const BookType = new GraphQLObjectType({
//     name: 'Book',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString }
//     })
// });

// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLID },
//         email: { type: GraphQLString },
//     })
// });

// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         book: {
//             type: BookType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//             }
//         },
//         user: { 
//             type: UserType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {

//             }
//         }
//     }
// });

// module.exports =
//  new GraphQLSchema({
//     query: RootQuery
// });

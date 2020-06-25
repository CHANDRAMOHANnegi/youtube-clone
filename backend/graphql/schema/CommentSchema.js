

module.exports = `

 
type Comment {
    id:ID!,
    content:String!,
    createdAt:String!
 }

input CommentInput {

    userId:String!,
    videoId:String!,
    content:String!

   }

`;

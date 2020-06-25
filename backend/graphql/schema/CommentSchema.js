

module.exports = `

 
type Comment {
    content:String!,
    writer:writer,
}

type CommentInput {

    userId:ID!,
    videoId:ID!,
    content:String!

   }

`;

const { gql } = require('apollo-server-express');

const typeDefs = gql`

# I think this new type is throwing an error so setting image back to String
# type Image {
#     url: String!
#     height: Int
#     width: Int
#     format: String
#   }

type Book {
    _id: ID
    authors: [String!]! #how do I set as an array option
    description: String! #needs to be required
    # // saved book id from GoogleBooks
    bookId: String! #needs to be required
    title: String! #needs to be required
    image: String
    link: String
}

type User {
    _id: ID
    username: String! #needs to be unique and required
    email: String! #needs to be unique and required & match  match: [/.+@.+\..+/, 'Must use a valid email address'],
    password: String! #required
    bookCount: Int
    savedBooks: [Book!]!
}

# Need to review Query for me and if there are additional pieces
type Query {
    me: User
}

type Auth {
    token: String!
    user: User!
}

#Define which mutations are allowed to be made by the client
type Mutation {
    # set the required fields to save a Book
    saveBook(authors: [String!]!, description: String!, title: String!, bookId: String!, image: String, link: String): Book
    
    # set requirements for removing a book
    removeBook(bookId: String!): User

    #set the required fields for a new User
    addUser(username: String!, email: String!, password: String!): Auth
    
    # login mutation
    loginUser(email: String!, password: String!): Auth
}
`;
module.exports = typeDefs;

//complete 5/10/23
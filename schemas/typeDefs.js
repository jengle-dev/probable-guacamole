const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    _id: ID
    authors: String
    description: String #needs to be required
    # // saved book id from GoogleBooks
    bookId: String #needs to be required
    title: String #needs to be required
    image: String
    link: String
}

type User {
    username: String #needs to be unique and required
    email: String #needs to be unique and required & match  match: [/.+@.+\..+/, 'Must use a valid email address'],
    password: String #required
}

#Define which mutations are allowed to be made by the client
type Mutation {
    #set the required fields for a new Book
    addBook(description: String!, bookID: String!, title: String!): Book
    #set the required fields for a new User
    addUser(username: String!, email: String!, password: String!): User
}
`;
module.exports = typeDefs;


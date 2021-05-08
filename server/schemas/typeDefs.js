// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Auth {
        token: ID!
        user: User
    }
    
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    input BookInput {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User

    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser():
        saveBook():
        removeBook();

    }

    `;

module.exports = typeDefs;

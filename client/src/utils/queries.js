// this will hold the query GET_ME, which will execute the me query set up using Apollo server

import { gql } from '@apollo/client';

// I dont know if this is correct, I feel like it could be User or need User but maybe not because me in line 8 is pulling User typeDef
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks {
        _id
        authors
        description
        bookId
        title
        image {
          url
          height
          width
          format
        }
        link
      }
    }
  }
`;

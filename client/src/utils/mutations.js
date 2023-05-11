import { gql } from '@apollo/client';

// LOGIN_USER
export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        _id
        email
        password
    }
}
`;

// ADD_USER
export const ADD_USER = gql`
mutation
`;

// SAVE_BOOK
export const SAVE_BOOK = gql`
mutation
`;

// REMOVE_BOOK
export const REMOVE_BOOK = gql`
mutation
`;
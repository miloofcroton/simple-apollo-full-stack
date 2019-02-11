import gql from 'graphql-tag';

export const CREATE_MESSAGE = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation($id: ID!) {
    deleteMessage(id: $id)
  }
`;

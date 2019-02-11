import gql from 'graphql-tag';

export const CHECK_TOKEN = gql`
  {
    me {
      id
      username
      email
      role
    }
  }
`;

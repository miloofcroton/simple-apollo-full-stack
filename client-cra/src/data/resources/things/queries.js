import gql from 'graphql-tag';

export const GET_THINGS = gql`
  query {
    things {
      id
      title
      description
    }
  }
`;

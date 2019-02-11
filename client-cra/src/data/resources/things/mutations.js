import gql from 'graphql-tag';

export const CREATE_THING = gql`
  mutation($title: String!, $description: String!) {
    createThing(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

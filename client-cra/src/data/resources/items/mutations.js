import gql from 'graphql-tag';

export const CREATE_ITEM = gql`
  mutation($title: String!, $description: String!) {
    createItem(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

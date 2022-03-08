import gql from "graphql-tag";

export const AddCheckIns = gql`
  mutation MyMutation(
    $name: String!
    $comment: String!
    $image_url: String!
    $created_at: timestamptz!
  ) {
    insert_check_in_one(
      object: {
        name: $name
        comment: $comment
        image_url: $image_url
        created_at: $created_at
      }
    ) {
      id,
      name,
      comment,
      image_url,
      created_at,
    }
  }
`;

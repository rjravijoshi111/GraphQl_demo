import gql from 'graphql-tag'

export const MuQuery = gql`
  query MyQuery {
    check_in {
        name,
        comment,
        image_url,
        id,
        created_at
      }
  }
`
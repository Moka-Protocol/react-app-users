export const GET_MOKA_USER = `
  query GetUserPosts($id: String!) {
    user(id: $id) {
      id
      tokenRewards
      tokenSpent
      posts(orderBy: timestamp, orderDirection: desc) {
        id
        upvotes
        timestamp
        user {
          id
        }
        post
        tags
        payouts {
          id
          type
          rank
          reward
        }
      }
      upvotes(orderBy: timestamp, orderDirection: desc) {
        id
        postId
        timestamp
        post {
          id
          upvotes
          timestamp
          user {
            id
          }
          post
          tags
          payouts {
            id
            type
            rank
            reward
          }
        }
      }
    }
  }
`;

export const GET_USER_UPVOTES_IDS = `
  query GetUserUpvotesIds($id: String!) {
    user(id: $id) {
      id
      upvotes {
        id
        postId
      }
    }
  }
`;
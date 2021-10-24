import { gql } from '@apollo/client';
import {  GET_USER_UPVOTES_IDS } from 'gql/queries';

const POST_FRAGMENT = gql`
  fragment post on Post {
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
`;

export function updateUpvote(client, account, postItem) {
  try {
    //UPDATE POST UPVOTE COUNT
    let readData = client.readFragment({ id: postItem, fragment: POST_FRAGMENT });

    let postData = Object.assign({}, readData);
    postData.upvotes = parseInt(postData.upvotes) + 1;

    client.writeFragment({ id: postItem, fragment: POST_FRAGMENT, data: postData });

    //UPDATE USER VOTES
    let userData = client.readQuery({
      query: gql(GET_USER_UPVOTES_IDS),
      variables: { id: account && account.toString().toLowerCase() }
    });

    let upvotes = Object.assign([], userData.user.upvotes);

    upvotes.push({
      id: account.toString().toLowerCase() + '_' + postItem,
      postId: postItem,
      __typename: 'Upvote'
    });

    client.writeQuery({
      query: gql(GET_USER_UPVOTES_IDS),
      variables: { id: account && account.toString().toLowerCase() },
      data: {
        user: {
          id: account.toString().toLowerCase(),
          __typename: userData.user.__typename,
          upvotes
        }
      }
    });
  
  } catch(e) { }
}

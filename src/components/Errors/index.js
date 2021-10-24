import React from 'react';

//STYLES
import { Wrap, Bubble } from './styles';

function Errors(props) {
  const error = props.error;

  return (
    <Wrap>
      <Bubble>
        { error === 'wrong_network' && 'Wrong Network' }
        { error === 'already_upvoted' && 'Already Upvoted' }
        { error === 'insufficient_funds' && 'Not Enough Moka Tokens' }
        { error === 'cant_upvote_own_post' && 'Can\'t Upvote Own Post' }
        { error === 'error' && 'Unexpected Error' }
      </Bubble>
    </Wrap>
  );
}

export default Errors;
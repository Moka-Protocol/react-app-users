import React, { useEffect, useState } from 'react';
import anchorme from "anchorme";
import { useApolloClient } from '@apollo/client';
import { CONTRACTS, MOKA_LINKS } from 'constants/constants';
import { getMDHMForTimestamp, getDisplayForTimestamp } from 'constants/functions';

//WEB3
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';

//CONTRACT ABIS
import MokaTokenABI from 'contracts/MokaToken.json';

//CACHE
import { updateUpvote } from 'cache/update';

//COMPONENTS
import Love from 'assets/svgs/love';

//STYLES
import { Wrap, Vote, Body, BodyTop, UserLink, PostLink, BodyMedium, BodyBottom } from './styles';

const contract = new Contract(CONTRACTS[process.env.REACT_APP_ENV].MOKATOKEN, new utils.Interface(MokaTokenABI))

function Post(props) {
  const client = useApolloClient();
  const [updateCache, setUpdateCache] = useState(false);
  const { state, send } = useContractFunction(contract, 'upvotePost', { transactionName: 'UpVote' })
  const propsCallback = props.txErrorCallback;

  useEffect(() => {
    if (state.status === 'Mining' && updateCache === false) {
      setUpdateCache(true);
      updateUpvote(client, props.account, props.item.id);
    }

    if (state.status === 'Exception') {
      if (state.errorMessage === 'execution reverted: User Already Upvoted') {
        propsCallback('already_upvoted');
      } else if (state.errorMessage === 'execution reverted: ERC20: transfer amount exceeds balance') {
        propsCallback('insufficient_funds');
      } else if (state.errorMessage === 'execution reverted: Cannot Upvote Own Post') {
        propsCallback('cant_upvote_own_post');
      } else if (state.errorMessage === 'unknown account #0') {
        propsCallback('not_connected');
      } else {
        propsCallback('error');
      }
    }
  },[state, updateCache, client, props.account, props.item.id, propsCallback]);

  return (
    <Wrap>
      <Body>
        <BodyTop>
          <UserLink  href={MOKA_LINKS[process.env.REACT_APP_ENV].user + props.item.user.id} target="_blank">
            {props.item.user.id.substring(0, 8)}...
          </UserLink>
          <div style={{ margin: '0 5px' }}>·</div>
          <PostLink href={MOKA_LINKS[process.env.REACT_APP_ENV].post + props.item.id} target="_blank">
            {getDisplayForTimestamp(props.item.timestamp)}
          </PostLink>
        </BodyTop>
        <BodyMedium>
          {
            props.item.post &&
            <div style={{ fontSize: '0.95em' }} dangerouslySetInnerHTML={{__html: anchorme({ input: props.item.post, options: { attributes: { class: "post-link", target: "_blank" }, truncate: 30 } })}}></div>
          }
        </BodyMedium>
        <BodyBottom>
          {
            props.item.tags && props.item.tags.map((item, index) => (
              <div key={index} style={{ fontSize: '0.85em', background: '#fbf4d2', padding: '2px 6px', borderRadius: '5px', marginRight: '6px' }}>{item}</div>
            ))
          }
        </BodyBottom>
      </Body>
      <Vote
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          send(props.item.user.id, props.item.id);
        }}
      >
        <Love size="22px" fill={props.userUpvotes.includes(props.item.id) ? true : false} />
        <div style={{ marginTop: '5px', fontSize: '1.1em', color: props.userUpvotes.includes(props.item.id) ? '#bf3a2b' : '#333' }}>{props.item.upvotes}</div>
      </Vote>
    </Wrap>
  );
}

export default Post;
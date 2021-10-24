import React, { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from "@apollo/client";
import { LINKS, MOKA_LINKS, MAINNETINFURA } from 'constants/constants';
import { GET_USER_UPVOTES_IDS, GET_MOKA_USER } from 'gql/queries';
import { getENS } from 'ens-lookup';

//WEB3
import { useEthers } from '@usedapp/core';
import { ethers } from 'ethers';

//COMPONENTS
import Post from 'components/Post';
import Notifications from 'components/Notifications';
import Errors from 'components/Errors';

//MODALS
import WrongNetworkModal from 'components/Modals/WrongNetworkModal';

//STYLES
import { Wrap, NetworkBar, NetworkBarInternal, Profile, ProfilePic, Address, Header, HeaderOption, Body, FooterLink } from './styles';

const NFT_API = 'https://use.nifti.es/api/:id';
const IPFS_API = 'https://ipfs.io/ipfs/:id';

function Users(props) {
  const uid = props.match.params.uid;

  const [type, setType] = useState('posts');
  const [userUpvotes, setUserUpvotes] = useState([]);
  const [modal, setModal] = useState(null);
  const [wrongNetwork, setWrongNetwork] = useState(false);
  const [ensData, setEnsData] = useState(null);
  const [profileURL, setProfileURL] = useState(null);
  const [txError, setTxError] = useState(null);

  const { activateBrowserWallet, account, error } = useEthers();

  const { data: voteData, refetch } = useQuery(gql(GET_USER_UPVOTES_IDS), { variables: { id: account && account.toString().toLowerCase() }, skip: !account });
  const { data } = useQuery(gql(GET_MOKA_USER), { variables: { id: uid.toLowerCase() } });

  useEffect(() => {
    async function getENSData() {
      const etherscanProvider = new ethers.providers.JsonRpcProvider(MAINNETINFURA);
      const name = await etherscanProvider.lookupAddress(uid);

      if (name) {
        const ensData = await getENS(etherscanProvider)(name);
        setEnsData(ensData);

        if(ensData.records && ensData.records.avatar) {
          if (ensData.records.avatar.startsWith('eip155')) {
            fetch(NFT_API.replace(':id', ensData.records.avatar))
                .then(response => response.json())
                .then(data => {
                  if (data.metadata.image) {
                    setProfileURL(data.metadata.image);
                  }
                });
          } else if (ensData.records.avatar.startsWith('ipfs')) {
            setProfileURL(IPFS_API.replace(':id', ensData.records.avatar.split('://')[1]));
          }
        }
      }
    }

    try { getENSData(); } catch(e) { }
  }, [uid]);

  //REFETCH ACCOUNT UPVOTES
  useEffect(() => {
    if (voteData) {
      if (voteData && voteData.user && voteData.user.upvotes && voteData.user.upvotes.length > 0 && voteData.user.id === account.toString().toLowerCase()) {
        let upvotes = [];
        for (var i = 0; i < voteData.user.upvotes.length; i++) {
          upvotes.push(voteData.user.upvotes[i].postId);
        }
        setUserUpvotes(upvotes);
      } else {
        setUserUpvotes([]);
      }
    } else {
      setUserUpvotes([]);
    }

    if (account && voteData && voteData.user) {
      if (account.toString().toLowerCase() !== voteData.user.id) {
        refetch();
      }
    }
  },[voteData, account, refetch]);

  //WRONG NETWORK
  useEffect(() => {
    if (
      (error && error.message && error.message.toLowerCase().replace(/\s/g, '').includes('unsupportedchain')) ||
      (error && error.name === 'UnsupportedChainIdError')
    ) {
      setWrongNetwork(true);
    }
  },[error]);

  const onTxErrorCallback = useCallback(error => {
    setTxError(error);
    setTimeout(function(){ setTxError(null); }, 2000);
  }, []);

  return (
    <Wrap>
      <Profile>
        {
          !ensData &&
          <Address>{uid}</Address>
        }
        {
          ensData &&
          <React.Fragment>
            {
              profileURL &&
              <ProfilePic alt="profile" src={profileURL} />
            }
            <Address>{ensData.domain}</Address>
          </React.Fragment>
        }
      </Profile>
      {
        wrongNetwork === true &&
        <NetworkBar onClick={() => setModal('WRONG-NETWORK')}><NetworkBarInternal error={true}>Wrong Network</NetworkBarInternal></NetworkBar>
      }
      {
        wrongNetwork === false && 
        <React.Fragment>
          {
            !account &&
            <NetworkBar onClick={() => activateBrowserWallet()}><NetworkBarInternal>⛓️&nbsp;Connect Wallet</NetworkBarInternal></NetworkBar>
          }
          {
            account &&
            <NetworkBar>
              <NetworkBarInternal>
                <a href={MOKA_LINKS[process.env.REACT_APP_ENV].user + account} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>⛓️&nbsp;{account.substring(0, 8)}...</a>
              </NetworkBarInternal>
            </NetworkBar>
          }
        </React.Fragment>
      }
      <Body>
        <Header>
          <HeaderOption selected={type === 'posts'} onClick={() => setType('posts')}>Posts</HeaderOption>
          <HeaderOption selected={type === 'likes'} onClick={() => setType('likes')}>Likes</HeaderOption>
        </Header>
        {
          type === 'posts' &&
          <div>
          {
            data && data.user && data.user.posts && data.user.posts.map((item, index) =>
              <Post key={index} index={index} account={account} userUpvotes={userUpvotes} txErrorCallback={onTxErrorCallback} item={item} />
            )
          }
          </div>
        }
        {
          type === 'likes' &&
          <div>
          {
            data && data.user && data.user.upvotes && data.user.upvotes.map((item, index) =>
              <Post key={index} index={index} account={account} userUpvotes={userUpvotes} txErrorCallback={onTxErrorCallback} item={item.post} />
            )
          }
          </div>
        }
      </Body>
      {
        txError && !wrongNetwork &&
        <Errors error={txError} />
      }
      {
        !txError && !wrongNetwork &&
        <Notifications pageLoadTime={props.pageLoadTime} />
      }
      <div style={{ flexShrink: '0', width: '100%', marginTop: 'auto', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FooterLink href={LINKS.ABOUT} target="_blank" rel="noreferrer">About Moka</FooterLink>
        <div style={{ margin: '0 10px' }}>·</div>
        <FooterLink href="https://www.ethereum.org" target="_blank" rel="noreferrer">Built on ♦</FooterLink>
        <div style={{ margin: '0 10px' }}>·</div>
        {
          process.env.REACT_APP_ENV === 'ROPSTEN' &&
          <div style={{ color: '#6e6e6e' }}>Ropsten Network</div>
        }
        {
          process.env.REACT_APP_ENV === 'MATIC' &&
          <div style={{ color: '#6e6e6e' }}>Polygon Network</div>
        }        
      </div>
      {
        modal === 'WRONG-NETWORK' &&
        <WrongNetworkModal closeModal={() => setModal(null)} />
      }
    </Wrap>
  );
}

export default Users;
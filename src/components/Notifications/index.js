import React from 'react';
import ReactTooltip from 'react-tooltip';
import { BLOCKEXPLORERS } from 'constants/constants';

//WEB3
import { useTransactions } from '@usedapp/core';

//COMPONENTS
import Checkmark from 'assets/svgs/checkmark';

import { Wrap, Bubble } from './styles';

function Notifications(props) {
  const { transactions } = useTransactions();
  const pageLoadTime = props.pageLoadTime;

  return (
    <Wrap>
      {
        transactions && transactions.length > 0 && transactions.map((item, index) => {
          return (item.submittedAt > pageLoadTime) ? (
            <React.Fragment key={index}>
              <ReactTooltip id={item.transaction.hash} place="left" type="dark" effect='solid'>
                <div><b>Type</b>: {item.transactionName}&nbsp;&nbsp;<b>Status</b>: {item.receipt ? 'Confirmed' : 'Pending...'}</div>
              </ReactTooltip>
              <Bubble data-tip data-for={item.transaction.hash} txComplete={item.receipt ? true : false} key={index} href={BLOCKEXPLORERS[process.env.REACT_APP_ENV] + 'tx/' + item.transaction.hash} target="_blank" rel="noreferrer">
                <Checkmark size="10px" style={{ marginRight: '1px' }} />
              </Bubble>
            </React.Fragment>
          ) : null;
        })
      }
    </Wrap>
  );
}

export default Notifications;
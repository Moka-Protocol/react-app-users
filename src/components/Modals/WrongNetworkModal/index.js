import React from 'react';
import Modal from 'react-modal';
import { LINKS, NETWORKNAME } from 'constants/constants';

//COMPONENTS
import Close from 'assets/svgs/close';

//STYLES
import { CloseWrap } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '350px',
    border: 'none'
  },
};

Modal.setAppElement('#root');

function WrongNetworkModal(props) {
  return (
    <Modal
      style={customStyles}
      isOpen={true}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      overlayClassName="ModalOverlay"
      onRequestClose={props.closeModal}
    >
      <CloseWrap onClick={props.closeModal}><Close size="16px" /></CloseWrap>
      <div>
        <div style={{ marginBottom: '20px', fontWeight: 600 }}>Wrong Network</div>
        <div style={{ lineHeight: 1.5, marginBottom: '10px' }}>To participate in Moka, please connect to the {NETWORKNAME[process.env.REACT_APP_ENV]} and refresh the page.</div>
        <a style={{ color: 'inherit' }} href={LINKS.CONNECT} target="_blank" rel="noreferrer">Click here for a step-by-step guide</a>.
      </div>
    </Modal>
  );
}

export default WrongNetworkModal;
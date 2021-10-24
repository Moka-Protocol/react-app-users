import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = '22px';
const DEFAULT_COLOR = '#333';

function Close(props) {
  const color = props.fill ? props.fill : DEFAULT_COLOR;
  const size = props.size ? props.size : DEFAULT_SIZE;

  return (
    <svg viewBox="0 0 512 512" height={size} width={size} fill={color}>
      <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
    </svg>
  );
}

export default Close;

Close.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.string
};

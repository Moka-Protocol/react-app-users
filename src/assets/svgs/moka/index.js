import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_SIZE = '25px';
const DEFAULT_COLOR = '#4f4238';

function Moka(props) {
  const color = props.fill ? props.fill : DEFAULT_COLOR;
  const size = props.size ? props.size : DEFAULT_SIZE;

  return (
    <svg height={size} width={size} fill={color} x="0px" y="0px" viewBox="0 0 91 91">
      <g>
        <path d="M45.829,84.744c-1.049,1.816-2.941,5.851,5.465,5.244c13.696-0.969,26.947-14.57,27.497-42.531   c0-0.267,0.017-0.545,0-0.789c0-0.295,0.029-0.554,0.049-0.834c0.538-28-18.363-42.795-26.405-43.225   C46.387,2.282,45.65,17.04,45.65,17.04s-0.542,12.273,3.226,28.482c2.041,8.787,2.252,12.908,2.225,17.801   C51.06,69.112,50.302,75.504,45.829,84.744z"></path>
        <path d="M37.339,88.771c6.283-11.159,8.312-31.644,2.294-50.56c-4.292-13.408-0.588-26.595,3.376-35.437   c-1.228-1.014-2.632-0.866-2.632-0.866C28.6,1.672,12.824,16.056,12.257,44.022c-0.013,0.314,0.033,0.547,0.023,0.859   c0,0.249-0.053,0.515-0.053,0.797C11.695,72.646,25.775,87.52,37.339,88.771z"></path>
      </g>
    </svg>
  );
}

export default Moka;

Moka.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.string
};

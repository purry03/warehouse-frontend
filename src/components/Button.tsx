import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

function Button(props) {
  const { title, onClick } = props;

  return (<div role="button" className="button-wrapper" onClick={onClick}><button type="button">{title}</button></div>);
}

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  title: '',
};

export default Button;

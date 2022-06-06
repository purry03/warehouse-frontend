import React from 'react';
import './Button.css';

function Button(props) {
  return (<div className="button-wrapper" onClick={props.onClick}><button type="button">{props.title}</button></div>);
}
export default Button;

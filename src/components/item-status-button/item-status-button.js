import React from 'react';

const ItemStatusButton = (props) => {
  return (
    <button type="button"
      className={"btn " + props.classes}
      onClick={props.onBtnClick}>
      {props.buttonLabel}
    </button>
  );
};

export default ItemStatusButton;
import React, { Component } from 'react';

import './item-status-filter.css';

import ItemStatusButton from "../item-status-button";

export default class ItemStatusFilter extends Component {

  render() {
    const { onBtnClick, statusButtonActive } = this.props;

    const activeClass = "btn-info";
    const secondaryClass = "btn-outline-secondary";

    // if()
    return (
      <div className="btn-group">
        <ItemStatusButton
          buttonLabel="All"
          classes={statusButtonActive === "All" ? activeClass : secondaryClass}
          onBtnClick={onBtnClick} />
        <ItemStatusButton
          buttonLabel="Active"
          classes={statusButtonActive === "Active" ? activeClass : secondaryClass}
          onBtnClick={onBtnClick} />
        <ItemStatusButton
          buttonLabel="Done"
          classes={statusButtonActive === "Done" ? activeClass : secondaryClass}
          onBtnClick={onBtnClick} />
        {/* <button type="button"
          className="btn btn-info">All</button>
        <button type="button"
          className="btn btn-outline-secondary">Active</button>
        <button type="button"
          className="btn btn-outline-secondary">Done</button> */}
      </div>
    );
  }
};
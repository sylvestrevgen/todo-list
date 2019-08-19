import React from 'react';

import './search-panel.css';

const SearchPanel = (props) => {
  return (
    <input type="text"
      className="form-control search-input" 
      onChange={props.onSearchChange}
      placeholder="Type to search..." 
      value={props.value} />
  );
};

export default SearchPanel;

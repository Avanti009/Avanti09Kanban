import React from 'react';

const GroupSelector = ({ selectedOption, onGroupingChange }) => {
  const handleGroupingChange = (event) => {
    onGroupingChange(event.target.value);
  };

  return (
    <div className="group-selector">
      <h3>Group By:</h3>
      <label>
        <input
          type="radio"
          value="status"
          checked={selectedOption === 'status'}
          onChange={handleGroupingChange}
        />
        Status
      </label>
      <label>
        <input
          type="radio"
          value="user"
          checked={selectedOption === 'user'}
          onChange={handleGroupingChange}
        />
        User
      </label>
      <label>
        <input
          type="radio"
          value="priority"
          checked={selectedOption === 'priority'}
          onChange={handleGroupingChange}
        />
        Priority
      </label>
    </div>
  );
};

export default GroupSelector;




















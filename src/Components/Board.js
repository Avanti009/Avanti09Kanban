import React, { useState, useEffect } from 'react';
import Card from './Card';
import './styles.css';
import GroupSelector from './GroupSelector';

const Board = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');

  const groupingOptionsMap = {
    status: { 0: 'Todo', 1: 'In Progress', 2: 'Backlog', 3: 'Done', 4: 'Cancelled' },
    user: {}, // Fill in with user ID to name mapping
    priority: { 0: 'Low', 1: 'Medium', 2: 'High', 3: 'Urgent', 4: 'No Priority' }
  };

  const [users, setUsers] = useState([]); // State to store users data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const jsonData = await response.json();
        setData(jsonData.tickets);
        setUsers(jsonData.users);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Inside the component
  const userIdToNameMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  const groupAndSortData = (groupKey, sortKey) => {
    const groupedData = data.reduce((result, ticket) => {
      const groupValue = groupKey === 'user' ? ticket.userId : ticket[sortKey];
      const group = result.find(item => item.name === groupValue);
      if (group) {
        group.items.push(ticket);
      } else {
        result.push({ name: groupValue, items: [ticket] });
      }
      return result;
    }, []);

    groupedData.forEach(group => {
      group.items.sort((a, b) => a[sortKey] - b[sortKey]);
    });

    return groupedData.map(group => ({
      name: group.name,
      items: group.items.map(item => ({
        id: item.id,
        title: item.title,
        camNumber: item.id,
        tags: item.tag
      }))
    }));
  };

  const groupedAndSortedData = groupAndSortData(groupingOption, sortingOption);

  const handleGroupingChange = selectedGrouping => {
    setGroupingOption(selectedGrouping);
  };

  return (
    <div className="board">
      {/* Top Row */}
      <div className="top-row">
        <h1>Kanban Board</h1>
        <div className="square-container">
          <GroupSelector selectedOption={groupingOption} onGroupingChange={handleGroupingChange} />
        </div>
      </div>

      {}
      <div className="button-row">
        <div className="square-container">
          <button className="add-button">+</button>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        {groupedAndSortedData.map(group => (
          <div className="column" key={group.name}>
            <h2>{groupingOptionsMap[groupingOption][group.name]}</h2>
            {
              
            }
            {groupingOption === 'user' && (
              <p className="bold-dark-text">{userIdToNameMap[group.name]}</p>
            )}
            {group.items.map(item => (
              <Card
                key={item.id}
                ticket={{
                  title: item.title,
                  camNumber: item.camNumber,
                  tags: item.tags
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;

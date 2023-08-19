import React, { useState } from 'react';

const Card = ({ ticket }) => {
  const hasFeatureRequestTag = ticket.tags && ticket.tags.includes('Feature Request');
  const [isDone, setIsDone] = useState(false);

  const handleCheckboxChange = () => {
    setIsDone(!isDone);
  };

  return (
    <div className="card" style={{ textAlign: 'left' }}>
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleCheckboxChange}
      />
      <h3 style={{ color: 'grey', fontSize: '14px', fontFamily: 'Times Roman' }}>{ticket.camNumber}</h3>
      <h3 style={{ color: 'Black', fontSize: '15px', fontFamily: 'Times Roman' }}>{ticket.title}</h3>
      {hasFeatureRequestTag && (
                <p style={{ border: '1px solid grey', padding: '2px 6px', borderRadius: '3px' }}>
                <span style={{ backgroundColor: 'grey', borderRadius: '50%', width: '10px', height: '10px', display: 'inline-block', marginRight: '6px' }}></span>
                Feature Request!
              </p>
      )}
    </div>
  );
};

export default Card;

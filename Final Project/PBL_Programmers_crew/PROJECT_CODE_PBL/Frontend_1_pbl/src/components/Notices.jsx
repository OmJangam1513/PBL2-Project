import React, { useState, useEffect } from 'react';
import '../styles/Notices.css';
import Notes from './Notes';

const Notices = ({ goBack }) => {
  const [notices, setNotices] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  useEffect(() => {
    // Preload some notices
    setNotices([
      { title: 'System Maintenance', description: 'The system will be down for maintenance on June 20, 2025.' },
      { title: 'New Policy Update', description: 'Please review the updated company policies in your email.' },
      { title: 'Team Meeting', description: 'A team meeting is scheduled for June 22, 2025, at 10:00 AM.' },
    ]);
  }, []);

  const handleNotesClick = () => {
    setShowNotes(true);
  };

  const handleBackClick = () => {
    setShowNotes(false);
  };

  if (showNotes) {
    return <Notes goBack={handleBackClick} />;
  }

  return (
    <div className="notices-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <div className="notices-header">
        <h1>Notices</h1>
        <button className="notes-button" onClick={handleNotesClick}>Notes</button>
      </div>
      <ul className="notices-list">
        {notices.map((notice, index) => (
          <li key={index} className="notice-item">
            <h2>{notice.title}</h2>
            <p>{notice.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notices;
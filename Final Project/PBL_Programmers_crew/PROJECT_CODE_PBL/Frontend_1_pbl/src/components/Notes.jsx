import React, { useState, useEffect } from 'react';
import '../styles/Notices.css';

const Notes = ({ goBack }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Preload some notes
    setNotes([
      { domain: 'Work', title: 'Meeting Notes', description: 'Discuss project milestones.' },
      { domain: 'Ideas', title: 'App Concept', description: 'Brainstorm app features.' },
    ]);
  }, []);

  return (
    <div className="notices-container">
      <button className="back-button" onClick={goBack}>Back</button>
      <h1>Notes</h1>
      <ul className="notices-list">
        {notes.map((note, index) => (
          <li key={index} className="notice-item">
            <h2>{note.title}</h2>
            <p><strong>Domain:</strong> {note.domain}</p>
            <p>{note.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
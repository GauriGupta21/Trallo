import React, { useState, useContext } from 'react';
import EventContext from '../context/EventContext';
import './EventForm.css';

const EventForm = ({ event = {}, onSave, onClose }) => {
  const { addEvent, editEvent } = useContext(EventContext);
  const [title, setTitle] = useState(event.title || '');
  const [date, setDate] = useState(event.date || '');
  const [category, setCategory] = useState(event.category || 'Work');
  const [description, setDescription] = useState(event.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = { id: event.id || Date.now(), title, date, category, description };
    if (event.id) {
      editEvent(updatedEvent);
    } else {
      addEvent(updatedEvent);
    }
    onSave(updatedEvent); 
  };

  return (
    <div className="event-form-container">
      <div className="form-header">
        <h2>{event.id ? 'Edit Event' : 'Add Event'}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="save-button">
          {event.id ? 'Save Changes' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;

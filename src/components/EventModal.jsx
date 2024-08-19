import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import EventContext from "../context/EventContext";
import EventForm from "./EventForm";
import "./EventModal.css";

const EventModal = ({ isOpen, event, onClose }) => {
  const { editEvent, deleteEvent } = useContext(EventContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen || !event) return null;

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedEvent) => {
    editEvent(updatedEvent);
    setIsEditing(false);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="event-modal-overlay">
      <div className="event-modal-content">
        {isEditing ? (
          <EventForm
            event={event}
            onSave={(updatedEvent) => handleSave(updatedEvent)}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <>
            <h2>{event.title}</h2>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <div className="modal-buttons">
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default EventModal;

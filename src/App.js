import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import EventForm from "./components/EventForm";
import Modal from "./components/Modal";
import "./App.css";
import Calendar from "./components/Calender";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const handleSaveEvent = (newEvent) => {
    // Logic to save the event
    console.log("Event saved:", newEvent);
    closeModal();
  };

  return (
    <EventProvider>
      <Router>
        <div>
          <nav>
            <Link to="/">Trallo Calendar</Link>
            <button onClick={openModal}>Add Event</button>
          </nav>

          <Routes>
            <Route path="/" element={<Calendar />} />
          </Routes>

          {isModalOpen && (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <EventForm onSave={handleSaveEvent} onClose={closeModal} />
            </Modal>
          )}
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;

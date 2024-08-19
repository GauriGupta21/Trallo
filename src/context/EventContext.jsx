import React, { createContext, useState } from 'react';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Meeting', date: '2024-08-20', category: 'Work', description: 'Discuss project milestones' },
    { id: 2, title: 'Conference', date: '2024-08-25', category: 'Personal', description: 'Attend tech conference' },
    { id: 3, title: 'Workshop', date: '2024-08-30', category: 'Work', description: 'ReactJS workshop' }
  ]);

  const [filterCategory, setFilterCategory] = useState('All');

  const addEvent = (event) => {
    setEvents([...events, { ...event, id: events.length + 1 }]);
  };

  const editEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const filteredEvents = filterCategory === 'All' ? events : events.filter(event => event.category === filterCategory);

  return (
    <EventContext.Provider value={{ events: filteredEvents, addEvent, editEvent, deleteEvent, filterCategory, setFilterCategory }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;

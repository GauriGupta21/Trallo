import React, { useState, useContext } from "react";
import EventContext from "../context/EventContext";
import EventModal from "./EventModal";
import "./Calendar.css";

const Calendar = () => {
  const { events, setFilterCategory, deleteEvent, editEvent, addEvent } =
    useContext(EventContext);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (direction) => {
    let newMonth = selectedMonth + direction;
    let newYear = selectedYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }

    setSelectedYear(newYear);
    setSelectedMonth(newMonth);
  };

  const renderMonth = (monthIndex) => {
    const today = new Date(selectedYear, monthIndex);
    const year = today.getFullYear();
    const month = today.getMonth();

    const startDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const calendarCells = [];

    for (let i = 0; i < startDay; i++) {
      calendarCells.push(
        <div
          className="calendar-cell empty"
          key={`empty-${monthIndex}-${i}`}
        ></div>
      );
    }

    days.forEach((day) => {
      const dayEvents = events.filter(
        (event) =>
          new Date(event.date).getFullYear() === year &&
          new Date(event.date).getMonth() === month &&
          new Date(event.date).getDate() === day
      );

      calendarCells.push(
        <div className="calendar-cell" key={`${monthIndex}-${day}`}>
          <div className="day-number">{day}</div>
          <div className="events">
            {dayEvents.map((event) => (
              <div
                className="event"
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setModalOpen(true);
                }}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    });

    return (
      <div className="calendar-month">
        <h1>{months[monthIndex]}</h1>
        <div className="calendar-grid">{calendarCells}</div>
      </div>
    );
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  };
  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => changeMonth(-1)}>
          &lt; Previous Month
        </button>
        <div>
          <h2 className="calendar-title">
            {months[selectedMonth]}{" "}
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="year-selector"
            >
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </h2>
        </div>
        <select onChange={handleCategoryChange} defaultValue="All">
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <button className="nav-button" onClick={() => changeMonth(1)}>
          Next Month &gt;
        </button>
      </div>
      <div className="calendar-container">{renderMonth(selectedMonth)}</div>
      {isModalOpen && selectedEvent && (
        <EventModal
          isOpen={isModalOpen}
          event={selectedEvent}
          onClose={closeModal}
          onSave={(updatedEvent) => {
            if (selectedEvent) {
              editEvent(updatedEvent);
            } else {
              addEvent(updatedEvent);
            }
          }}
          onDelete={() => {
            deleteEvent(selectedEvent.id);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default Calendar;

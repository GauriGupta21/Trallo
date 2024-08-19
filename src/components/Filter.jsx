import React, { useContext } from 'react';
import EventContext from '../context/EventContext';
import './Filter.css';

const Filter = () => {
  const { filterCategory, setFilterCategory } = useContext(EventContext);

  return (
    <div className="filter">
      <label htmlFor="category">Filter by Category:</label>
      <select
        id="category"
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  );
};

export default Filter;

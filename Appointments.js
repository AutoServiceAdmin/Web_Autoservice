import React, { useState } from 'react';

const Appointments = () => {
  const [form, setForm] = useState({ date: '', time: '', description: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Записан час:\n' + JSON.stringify(form, null, 2));
    // Тук ще добавим комуникация с бекенда в следваща стъпка
  };

  return (
    <div className="appointments">
      <h2>Запиши час</h2>
      <form onSubmit={handleSubmit}>
        <label>Дата:</label>
        <input type="date" name="date" onChange={handleChange} required />
        
        <label>Час:</label>
        <input type="time" name="time" onChange={handleChange} required />
        
        <label>Описание:</label>
        <textarea name="description" onChange={handleChange} required />
        
        <button type="submit">Запази</button>
      </form>
    </div>
  );
};

export default Appointments;

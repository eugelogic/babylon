import React, { useState, useEffect } from 'react';

import logo from './logo.png';
import { API_ENDPOINT } from './config';

import './App.scss';

function App() {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [consultantType, setConsultantType] = useState('gp');

  useEffect(() => {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then((response) => response.json())
      .then((data) => setAvailableSlots(data))
      .catch(() => {
        // to do: handle error
      });
  }, []);

  // calculate matching available slots
  let slots = [];
  for (let i = 0; i < availableSlots.length; i++) {
    for (let j = 0; j < availableSlots[i]['consultantType'].length; j++) {
      if (availableSlots[i]['consultantType'][j] === consultantType) {
        slots.push(availableSlots[i]);
      }
    }
  }

  return (
    <div className="app">
      <h2 className="h6">New appointment</h2>
      <div className="app-header">
        <img src={logo} className="app-logo" alt="Babylon Health" />
      </div>
      <div style={{ maxWidth: 600, margin: '24px auto' }}>
        <div
          className="button"
          id="GP-button"
          onClick={() => {
            setConsultantType('gp');
          }}
        >
          GP
        </div>
        <div
          className="button"
          onClick={() => {
            setConsultantType('therapist');
          }}
        >
          Therapist
        </div>
        <div
          className="button"
          onClick={() => {
            setConsultantType('physio');
          }}
        >
          Physio
        </div>
        <div
          className="button"
          onClick={() => {
            setConsultantType('specialist');
          }}
        >
          Specialist
        </div>
        <div>
          <strong>Appointments</strong>
          {slots.map((slot) => (
            <li
              key={slot.id}
              className="appointment-button"
              onClick={() => {
                setAvailableSlots(slot);
              }}
            >
              {slot.time}
            </li>
          ))}
        </div>
        <div>
          <strong>Notes</strong>
          <textarea />
        </div>
        <div>
          <div
            className="button"
            onClick={() => {
              /* TODO: submit the data */
            }}
          >
            Book appointment
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

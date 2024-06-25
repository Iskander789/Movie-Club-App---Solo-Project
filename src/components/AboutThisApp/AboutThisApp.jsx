// src/components/AboutThisApp/AboutThisApp.jsx

import React from 'react';
import './AboutThisApp.css';

const AboutThisApp = () => {
  return (
    <div className="container">
      <h1>About This App</h1>
      <section>
        <h2>Summary</h2>
        <p>
          The Movie Club app is a platform for movie enthusiasts to create and join movie clubs. Users can register, create
          clubs, and invite friends to join. Each club can have up to four members, and members can watch and discuss a
          selected movie every four weeks. The app also features a message board for discussions and a rating system for
          movies watched.
        </p>
      </section>
      <section>
        <h2>Future Features</h2>
        <ul>
          <li>Enhanced scheduling features with calendar integration.</li>
          <li>Email reminders for upcoming movie discussions.</li>
          <li>Integration with popular streaming services for direct movie access.</li>
          <li>Personalized movie recommendations based on user preferences.</li>
          <li>Mobile app version for both iOS and Android platforms.</li>
          <li>Advanced analytics for tracking viewing habits and discussion participation.</li>
          <li>Customizable profiles with more personalization options.</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutThisApp;

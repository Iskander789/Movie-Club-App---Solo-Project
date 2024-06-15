import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Welcome to the Movie Club App! This platform is designed to bring friends together in small movie clubs to discuss films on a bimonthly basis. Whether you're a casual moviegoer or a dedicated cinephile, our app provides the perfect environment for sharing your thoughts and opinions on the latest releases and classic films alike.
          </p>

          <p>
            Here are some of the key features of the Movie Club App:
          </p>

          <ul>
            <li>
              <strong>Create or Join Clubs:</strong> Easily create a new movie club or join an existing one with your friends. Each club can have up to four members, ensuring intimate and engaging discussions.
            </li>
            <li>
              <strong>Movie Discussions:</strong> Participate in discussions about the selected movie for the bimonthly period. Share your insights, favorite scenes, and critiques with other club members.
            </li>
            <li>
              <strong>Rate and Review:</strong> Rate each movie and leave detailed reviews to help others decide what to watch next.
            </li>
            <li>
              <strong>Watchlist Management:</strong> Keep track of movies you want to watch and those you've already seen with our built-in watchlist feature.
            </li>
            <li>
              <strong>Notifications and Reminders:</strong> Stay up-to-date with club activities through notifications and reminders about upcoming discussions and movie selections.
            </li>
            <li>
              <strong>Integrations:</strong> Seamlessly integrate with popular movie databases to fetch information about movies, including synopses, cast details, and trailers.
            </li>
          </ul>

          <p>
            Join the Movie Club App today and start enjoying movies with friends like never before!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

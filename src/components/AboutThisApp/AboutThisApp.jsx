import React from 'react';
import './AboutThisApp.css';

function AboutThisApp() {
  return (
    <div className="container">
      <h2>About This App</h2>
      <p>
        Welcome to the Movie Club App! This app is designed to bring friends together in small movie clubs to discuss films on a bimonthly basis. Whether you're a casual moviegoer or a dedicated cinephile, our app provides the perfect environment for sharing your thoughts and opinions on the latest releases and classic films alike.
      </p>
      <p>Here are some of the key features of the Movie Club App:</p>
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
      <p>Join the Movie Club App today and start enjoying movies with friends like never before!</p>
    </div>
  );
}

export default AboutThisApp;

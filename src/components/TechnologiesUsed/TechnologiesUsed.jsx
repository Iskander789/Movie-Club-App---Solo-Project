import React from 'react';
import './TechnologiesUsed.css';

function TechnologiesUsed() {
  return (
    <div className="container">
      <div>
        <h2>Technologies Used</h2>
        <p>
          Welcome to the Movie Club App! This project leverages modern web development technologies to provide a seamless and engaging experience for users. Here are the key technologies used in this project:
        </p>
        <ul>
          <li>
            <strong>React:</strong> A JavaScript library for building user interfaces. It allows us to create reusable UI components and manage the application state efficiently.
          </li>
          <li>
            <strong>Redux:</strong> A predictable state container for JavaScript apps. It helps manage the application state across different components.
          </li>
          <li>
            <strong>Redux-Saga:</strong> A middleware library that handles asynchronous actions in Redux. It makes it easier to manage side effects such as data fetching and integration with external APIs.
          </li>
          <li>
            <strong>Express:</strong> A minimal and flexible Node.js web application framework. It provides a robust set of features to build web and mobile applications.
          </li>
          <li>
            <strong>Passport:</strong> An authentication middleware for Node.js. It supports various authentication mechanisms and helps secure the application.
          </li>
          <li>
            <strong>PostgreSQL:</strong> A powerful, open source object-relational database system. It provides data integrity, scalability, and robust performance for managing the application's data.
          </li>
          <li>
            <strong>Axios:</strong> A promise-based HTTP client for the browser and Node.js. It is used to make HTTP requests to the server and handle responses.
          </li>
          <li>
            <strong>Vite:</strong> A build tool that provides a faster and leaner development experience for modern web projects. It is used for bundling the application during development and production.
          </li>
        </ul>
        <p>
          This project is structured to follow best practices in web development, ensuring a maintainable and scalable codebase. We hope you enjoy exploring and using the Movie Club App!
        </p>
      </div>
    </div>
  );
}

export default TechnologiesUsed;

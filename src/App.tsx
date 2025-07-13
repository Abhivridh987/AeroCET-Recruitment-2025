import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';


import WeatherDATA from './WeatherAPI';  
import GALLERY from './Gallery';  

// ✅ Home Component with buttons
const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <div className="content">
        <h1>
          Welcome to <span className="highlight">AeroCET</span> Recruitment 2025
        </h1>
        <p>Official Aeromodelling Club of College of Engineering, Trivandrum</p>
        <div className="button-group">
          <button onClick={() => navigate('/gallery')}>Task 1 [Gallery]</button>
          <button onClick={() => navigate('/weather')}>Task 2 [Weather]</button>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<GALLERY />} />
        <Route path="/weather" element={<WeatherDATA />} />
      </Routes>
    </Router>
  );
};

export default App;

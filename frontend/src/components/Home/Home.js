import React from 'react';
import './Home.css'; // Import custom styles for Home component
import videoSource from '../../assets/books.mp4'; // Import the video source
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='Container'>
  <div className='Content'>
    <div className='SubContent'>
    <h1 style={{ fontWeight: 'bold', fontSize: '4rem', color: 'white' }}>Food App</h1>
    </div>
  </div>
</div>

  );
};

export default Home;
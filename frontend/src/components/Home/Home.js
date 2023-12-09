import React from 'react';
import './Home.css'; // Import custom styles for Home component
import { Link } from 'react-router-dom';

const Home = () => {
  const backgroundImageStyle = {
    backgroundImage: `url("https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg")`, // Wrap the URL in `url()`
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const headingStyle = {
    fontWeight: 'bold',
    fontSize: '4rem',
    color: 'black',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Adjust values as needed
    fontFamily: 'Times New Roman', 
  };

  return (
    <div className='Container' style={backgroundImageStyle}>
      <div className='Content'>
        <div className='SubContent'>
          <h1 style={headingStyle}>FOOD HOSTS</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
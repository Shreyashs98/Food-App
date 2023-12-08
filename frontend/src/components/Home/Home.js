import React from 'react';
import './Home.css'; // Import custom styles for Home component
import videoSource from '../../assets/books.mp4'; // Import the video source
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='Container'>
  <video autoPlay='autoplay' loop='loop' muted className='Video'>
    <source src={videoSource} type='video/mp4' />
    Not supported the video
  </video>
  <div className='Content'>
    <div className='SubContent'>
    <h1 style={{ fontWeight: 'bold', fontSize: '4rem', color: 'white' }}>Book Library</h1>
      <p style={{ fontWeight: 'bold', fontSize: '2rem', color: 'white' }}>Manage your Books</p>
      <button type='button' className='btn btn-outline-dark'>
        <Link to='https://drive.google.com/uc?id=1aTRoJKPHmQvkKYL3jIQjJj_VscmhJVXu&export=download' style={{ fontFamily: 'Arial, sans-serif', textDecoration: 'none' }}>Download for Android</Link>
      </button>
    </div>
  </div>
</div>

  );
};

export default Home;
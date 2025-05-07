import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import graffitiBg from '../Graffiti-Art-Background-With-Throw-Up-And-Tagging-Hand-Drawn-Style-Mural-Wallpaper-M.jpg';

const Welcome = () => {
  const navigate = useNavigate();

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 0,
    background: `linear-gradient(rgba(30,30,40,0.7), rgba(30,30,40,0.7)), url(${graffitiBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    pointerEvents: 'none',
  };


  const brandStyle = {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '2.2rem',
    fontWeight: 700,
    color: '#fff',
    letterSpacing: '2px',
    marginBottom: '1.5rem',
    textAlign: 'center',
    textShadow: '0 3px 12px rgba(0,0,0,0.5)',
    textTransform: 'uppercase',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100vw',
    padding: 0,
    fontFamily: 'Montserrat, Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
  };

  const titleStyle = {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '1.2rem',
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '0 3px 12px rgba(0,0,0,0.6)',
  };

  const subtitleStyle = {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '1.3rem',
    marginBottom: '2.2rem',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: '1px',
    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '2rem',
    width: '100%',
    maxWidth: '1200px',
  };

  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '280px',
    height: '280px',
    borderRadius: '10px',
    cursor: 'pointer',
    background: 'white',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    padding: '2rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: '1px solid #e0e0e0',
    fontFamily: 'Montserrat, Arial, sans-serif',
  };


  const iconStyle = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const buttonTextStyle = {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: '#2c3e50',
    letterSpacing: '1px',
    marginBottom: '0.3rem',
    textShadow: '0 1px 4px rgba(255,255,255,0.2)',
  };


  const buttonDescStyle = {
    fontFamily: 'Montserrat, Arial, sans-serif',
    fontSize: '1rem',
    color: '#7f8c8d',
    marginTop: '0.5rem',
    fontWeight: 400,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}>
        <motion.h1 
          style={titleStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome To <span style={{ color: '#e74c3c' }}>Kaam</span>Khoj<span style={{ color: '#e74c3c' }}>.</span>in
        </motion.h1>
        <motion.h2 
          style={subtitleStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Login as?
        </motion.h2>
        <div style={{ ...buttonsContainerStyle, justifyContent: 'center', width: '100%', marginTop: '2rem' }}>
          <motion.div
            style={buttonStyle}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => navigate('/home')}
          >
            <div style={iconStyle}>👨‍💼</div>
            <div style={buttonTextStyle}>I AM A JOB SEEKER</div>
            <div style={buttonDescStyle}>Find your dream job</div>
          </motion.div>
          <motion.div
            style={buttonStyle}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onClick={() => navigate('/company-home')}
          >
            <div style={iconStyle}>🏢</div>
            <div style={buttonTextStyle}>I AM A JOB POSTER</div>
            <div style={buttonDescStyle}>Post jobs & find talent</div>
          </motion.div>
          <motion.div
            style={buttonStyle}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onClick={() => navigate('/admin')}
          >
            <div style={iconStyle}>⚙️</div>
            <div style={buttonTextStyle}>I AM ADMIN</div>
            <div style={buttonDescStyle}>Manage the platform</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
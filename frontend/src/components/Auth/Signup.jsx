import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import graffitiBg from '../../Graffiti-Art-Background-With-Throw-Up-And-Tagging-Hand-Drawn-Style-Mural-Wallpaper-M.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    title: '',
    location: '',
    phone: '',
    about: '',
    skills: '',
    languages: '',
    certifications: '',
    profileImage: null
  });
  
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { 
    name, email, password, confirmPassword, title, location, 
    phone, about, skills, languages, certifications, profileImage 
  } = formData;

  const onChange = e => {
    if (e.target.name === 'profileImage') {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: file });
      
      // Create preview URL for the image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    setError('');
  };
  
  const nextStep = () => {
    if (step === 1) {
      // Validate first step fields
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill all required fields');
        return;
      }
      
      // Validate password match
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Validate password strength
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }
    
    setError('');
    setStep(step + 1);
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      // Format skills, languages, and certifications as arrays
      const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean);
      const languagesArray = languages.split(',').map(lang => lang.trim()).filter(Boolean);
      const certificationsArray = certifications.split(',').map(cert => cert.trim()).filter(Boolean);
      
      // Create form data for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('name', name);
      formDataToSend.append('email', email);
      formDataToSend.append('password', password);
      formDataToSend.append('title', title);
      formDataToSend.append('location', location);
      formDataToSend.append('phone', phone);
      formDataToSend.append('about', about);
      formDataToSend.append('skills', JSON.stringify(skillsArray));
      formDataToSend.append('languages', JSON.stringify(languagesArray));
      formDataToSend.append('certifications', JSON.stringify(certificationsArray));
      
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }
      
      // For now, since we're not handling file uploads on the backend yet,
      // we'll use a regular JSON request
      const userData = {
        name,
        email,
        password,
        title,
        location,
        phone,
        about,
        skills: skillsArray,
        languages: languagesArray,
        certifications: certificationsArray
      };

      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Redirect to home page
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles (matching Home.js styling)
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Segoe UI", Arial, sans-serif',
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${graffitiBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: '4rem auto',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    textAlign: 'center'
  };
  
  const stepIndicatorStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
  };
  
  const stepDotStyle = (active) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: active ? '#e74c3c' : '#ddd',
    margin: '0 5px',
    transition: 'all 0.3s ease',
  });
  
  const stepButtonsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2rem',
  };
  
  const imagePreviewStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    margin: '0 auto 1.5rem',
    border: '5px solid #f8f9fa',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    display: 'block',
  };
  
  const fileInputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  };

  const formGroupStyle = {
    marginBottom: '1.5rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '1rem',
    color: '#34495e',
    fontWeight: '500'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    transition: 'border-color 0.3s ease',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const errorStyle = {
    color: '#e74c3c',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem'
  };

  const linkTextStyle = {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.9rem',
    color: '#7f8c8d'
  };

  const linkStyle = {
    color: '#e74c3c',
    textDecoration: 'none',
    fontWeight: '500'
  };

  return (
    <div style={pageStyle}>
      {/* Navigation Bar */}
      <nav style={navbarStyle}>
        <motion.div 
          style={logoStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <span style={{ color: '#e74c3c' }}>Kaam</span>Khoj<span style={{ color: '#e74c3c' }}>.</span>in
          </Link>
        </motion.div>
      </nav>

      {/* Signup Form */}
      <motion.div 
        style={formContainerStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={headingStyle}>Create Your Account</h1>
        
        <div style={stepIndicatorStyle}>
          <div style={stepDotStyle(step === 1)}></div>
          <div style={stepDotStyle(step === 2)}></div>
          <div style={stepDotStyle(step === 3)}></div>
        </div>
        
        {error && <div style={errorStyle}>{error}</div>}
        
        <form onSubmit={onSubmit}>
          {step === 1 && (
            <>
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="name">Full Name*</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="email">Email Address*</label>
                <input
                  style={inputStyle}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="password">Password*</label>
                <input
                  style={inputStyle}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Create a password"
                  required
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="confirmPassword">Confirm Password*</label>
                <input
                  style={inputStyle}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </>
          )}
          
          {step === 2 && (
            <>
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="title">Professional Title</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="location">Location</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={onChange}
                  placeholder="e.g. Mumbai, India"
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="phone">Phone Number</label>
                <input
                  style={inputStyle}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={onChange}
                  placeholder="e.g. +91 9876543210"
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="about">About You</label>
                <textarea
                  style={{...inputStyle, minHeight: '100px', resize: 'vertical'}}
                  id="about"
                  name="about"
                  value={about}
                  onChange={onChange}
                  placeholder="Write a short bio about yourself"
                />
              </div>
            </>
          )}
          
          {step === 3 && (
            <>
              <div style={fileInputContainerStyle}>
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile Preview" 
                    style={imagePreviewStyle} 
                  />
                ) : (
                  <div style={{...imagePreviewStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa', fontSize: '2rem'}}>
                    👤
                  </div>
                )}
                
                <label style={{...buttonStyle, display: 'inline-block', textAlign: 'center', marginBottom: '1rem', backgroundColor: '#e74c3c'}} htmlFor="profileImage">
                  Choose Profile Picture
                </label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={onChange}
                  accept="image/*"
                  style={{display: 'none'}}
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="skills">Skills (comma separated)</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="skills"
                  name="skills"
                  value={skills}
                  onChange={onChange}
                  placeholder="e.g. React.js, JavaScript, HTML, CSS"
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="languages">Languages (comma separated)</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="languages"
                  name="languages"
                  value={languages}
                  onChange={onChange}
                  placeholder="e.g. English, Hindi, Marathi"
                />
              </div>
              
              <div style={formGroupStyle}>
                <label style={labelStyle} htmlFor="certifications">Certifications (comma separated)</label>
                <input
                  style={inputStyle}
                  type="text"
                  id="certifications"
                  name="certifications"
                  value={certifications}
                  onChange={onChange}
                  placeholder="e.g. AWS Certified Developer, MongoDB Certified Developer"
                />
              </div>
            </>
          )}
          
          <div style={stepButtonsStyle}>
            {step > 1 && (
              <button 
                type="button"
                onClick={prevStep}
                style={{...buttonStyle, backgroundColor: 'transparent', color: '#2c3e50', border: '1px solid #2c3e50'}}
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button"
                onClick={nextStep}
                style={{...buttonStyle, marginLeft: step > 1 ? '0' : 'auto'}}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit"
                disabled={loading}
                style={{...buttonStyle, marginLeft: '0'}}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            )}
          </div>
        </form>
        
        <p style={linkTextStyle}>
          Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
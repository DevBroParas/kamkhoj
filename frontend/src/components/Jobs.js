import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'Mumbai, India',
      salary: '₹6,00,000 - ₹9,00,000 PA',
      description: 'We are looking for a skilled Frontend Developer with experience in React.js to join our team.',
      requirements: ['3+ years of experience', 'React.js', 'JavaScript', 'HTML/CSS'],
      postedDate: '2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'Digital Innovations',
      location: 'Bangalore, India',
      salary: '₹8,00,000 - ₹12,00,000 PA',
      description: 'Join our dynamic team as a Full Stack Developer working on cutting-edge web applications.',
      requirements: ['4+ years of experience', 'MERN Stack', 'Node.js', 'MongoDB'],
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Designs',
      location: 'Delhi, India',
      salary: '₹5,00,000 - ₹8,00,000 PA',
      description: 'Looking for a talented UI/UX Designer to create beautiful and intuitive user interfaces.',
      requirements: ['2+ years of experience', 'Figma', 'Adobe XD', 'User Research'],
      postedDate: '3 days ago'
    }
  ];
  
  // Styles
  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '"Segoe UI", Arial, sans-serif',
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  };
  
  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  };
  
  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };
  
  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
  };
  
  const searchContainerStyle = {
    marginBottom: '2rem',
  };
  
  const searchInputStyle = {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  };
  
  const tabsStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
  };
  
  const tabStyle = (isActive) => ({
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: isActive ? '#3498db' : '#f1f1f1',
    color: isActive ? 'white' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
  });
  
  const jobListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };
  
  const jobCardStyle = {
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
    transition: 'all 0.3s ease',
  };
  
  const jobTitleStyle = {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  };
  
  const jobCompanyStyle = {
    fontSize: '1.1rem',
    color: '#3498db',
    marginBottom: '0.5rem',
  };
  
  const jobDetailsStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  };
  
  const jobDescriptionStyle = {
    marginBottom: '1rem',
    color: '#34495e',
    lineHeight: '1.6',
  };
  
  const tagsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  };
  
  const tagStyle = {
    padding: '0.3rem 0.8rem',
    backgroundColor: '#e1f5fe',
    color: '#0288d1',
    borderRadius: '20px',
    fontSize: '0.8rem',
  };
  
  const buttonStyle = {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };
  
  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const dateStyle = {
    color: '#7f8c8d',
    fontSize: '0.9rem',
  };
  
  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  };
  
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <motion.div 
          style={logoStyle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>KAAMKHOJ.IN</Link>
        </motion.div>
        <motion.div 
          style={profileStyle}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={avatarStyle}>JS</div>
          <div>Job Seeker</div>
        </motion.div>
      </header>
      
      <motion.div 
        style={searchContainerStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input 
          type="text" 
          placeholder="Search for jobs, skills, or companies..." 
          style={searchInputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>
      
      <motion.div 
        style={tabsStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div 
          style={tabStyle(activeTab === 'available')}
          onClick={() => setActiveTab('available')}
        >
          Available Jobs
        </div>
        <div 
          style={tabStyle(activeTab === 'applied')}
          onClick={() => setActiveTab('applied')}
        >
          Applied Jobs
        </div>
        <div 
          style={tabStyle(activeTab === 'saved')}
          onClick={() => setActiveTab('saved')}
        >
          Saved Jobs
        </div>
      </motion.div>
      
      <motion.div 
        style={jobListStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {activeTab === 'available' && jobs.map((job, index) => (
          <motion.div 
            key={job.id}
            style={jobCardStyle}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div style={jobTitleStyle}>{job.title}</div>
            <div style={jobCompanyStyle}>{job.company}</div>
            <div style={jobDetailsStyle}>
              <div>{job.location}</div>
              <div>•</div>
              <div>{job.salary}</div>
            </div>
            <div style={jobDescriptionStyle}>{job.description}</div>
            <div style={tagsContainerStyle}>
              {job.requirements.map((req, i) => (
                <div key={i} style={tagStyle}>{req}</div>
              ))}
            </div>
            <div style={footerStyle}>
              <div style={dateStyle}>Posted {job.postedDate}</div>
              <motion.button 
                style={buttonStyle}
                whileHover={{ scale: 1.05, backgroundColor: '#2980b9' }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        ))}
        
        {activeTab === 'applied' && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
            You haven't applied to any jobs yet.
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#7f8c8d' }}>
            You haven't saved any jobs yet.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Jobs;

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CompanyHome = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salary: '',
    description: '',
    requirements: ''
  });
  
  // Mock data for posted jobs
  const postedJobs = [
    {
      id: 1,
      title: 'Senior Backend Developer',
      location: 'Mumbai, India',
      salary: '₹12,00,000 - ₹18,00,000 PA',
      applications: 24,
      status: 'active',
      postedDate: '5 days ago'
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Bangalore, India',
      salary: '₹15,00,000 - ₹25,00,000 PA',
      applications: 18,
      status: 'active',
      postedDate: '1 week ago'
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      location: 'Remote',
      salary: '₹10,00,000 - ₹16,00,000 PA',
      applications: 12,
      status: 'closed',
      postedDate: '3 weeks ago'
    }
  ];
  
  // Mock data for applicants
  const applicants = [
    {
      id: 1,
      name: 'Rahul Sharma',
      jobTitle: 'Senior Backend Developer',
      experience: '5 years',
      skills: ['Java', 'Spring Boot', 'Microservices', 'AWS'],
      appliedDate: '2 days ago',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Priya Patel',
      jobTitle: 'Senior Backend Developer',
      experience: '6 years',
      skills: ['Java', 'Kotlin', 'Docker', 'Kubernetes'],
      appliedDate: '3 days ago',
      status: 'shortlisted'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      jobTitle: 'Product Manager',
      experience: '4 years',
      skills: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis'],
      appliedDate: '1 day ago',
      status: 'pending'
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
  
  const companyProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  };
  
  const companyLogoStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '10px',
    backgroundColor: '#e74c3c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.2rem',
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
    backgroundColor: isActive ? '#e74c3c' : '#f1f1f1',
    color: isActive ? 'white' : '#333',
    fontWeight: isActive ? 'bold' : 'normal',
  });
  
  const dashboardStatsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };
  
  const statCardStyle = {
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
    textAlign: 'center',
  };
  
  const statNumberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: '0.5rem',
  };
  
  const statLabelStyle = {
    color: '#7f8c8d',
    fontSize: '1rem',
  };
  
  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#2c3e50',
  };
  
  const jobListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };
  
  const jobCardStyle = {
    padding: '1.2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const jobInfoStyle = {
    flex: '1',
  };
  
  const jobTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: '0.5rem',
  };
  
  const jobDetailsStyle = {
    display: 'flex',
    gap: '1rem',
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  };
  
  const jobStatsStyle = {
    display: 'flex',
    gap: '1rem',
  };
  
  const statBadgeStyle = (status) => ({
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    backgroundColor: status === 'active' ? '#e1f5fe' : '#ffebee',
    color: status === 'active' ? '#0288d1' : '#e53935',
  });
  
  const applicantCardStyle = {
    padding: '1.2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    backgroundColor: 'white',
    marginBottom: '1rem',
  };
  
  const applicantHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
  };
  
  const applicantNameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#2c3e50',
  };
  
  const applicantJobStyle = {
    color: '#7f8c8d',
    fontSize: '0.9rem',
  };
  
  const applicantDetailsStyle = {
    display: 'flex',
    gap: '2rem',
    marginBottom: '1rem',
  };
  
  const applicantDetailItemStyle = {
    fontSize: '0.9rem',
  };
  
  const applicantDetailLabelStyle = {
    color: '#7f8c8d',
    marginBottom: '0.2rem',
  };
  
  const applicantDetailValueStyle = {
    color: '#2c3e50',
    fontWeight: '500',
  };
  
  const skillsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  };
  
  const skillTagStyle = {
    padding: '0.3rem 0.8rem',
    backgroundColor: '#e1f5fe',
    color: '#0288d1',
    borderRadius: '20px',
    fontSize: '0.8rem',
  };
  
  const applicantFooterStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  
  const applicantDateStyle = {
    color: '#7f8c8d',
    fontSize: '0.9rem',
  };
  
  const applicantActionsStyle = {
    display: 'flex',
    gap: '0.5rem',
  };
  
  const actionButtonStyle = (primary = true) => ({
    padding: '0.5rem 1rem',
    backgroundColor: primary ? '#e74c3c' : 'white',
    color: primary ? 'white' : '#e74c3c',
    border: primary ? 'none' : '1px solid #e74c3c',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  });
  
  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
  };
  
  const formGroupStyle = {
    marginBottom: '1.5rem',
  };
  
  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#2c3e50',
    fontWeight: '500',
  };
  
  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };
  
  const textareaStyle = {
    width: '100%',
    padding: '0.8rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '5px',
    minHeight: '150px',
    resize: 'vertical',
  };
  
  const submitButtonStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Job posting submitted:', formData);
    // Reset form after submission
    setFormData({
      title: '',
      location: '',
      salary: '',
      description: '',
      requirements: ''
    });
    // Switch to dashboard tab to see the new job
    setActiveTab('dashboard');
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
          KAAMKHOJ.IN
        </motion.div>
        <motion.div 
          style={companyProfileStyle}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={companyLogoStyle}>TC</div>
          <div>TechCorp Inc.</div>
        </motion.div>
      </header>
      
      <motion.div 
        style={tabsStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div 
          style={tabStyle(activeTab === 'dashboard')}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </div>
        <div 
          style={tabStyle(activeTab === 'post-job')}
          onClick={() => setActiveTab('post-job')}
        >
          Post a Job
        </div>
        <div 
          style={tabStyle(activeTab === 'applicants')}
          onClick={() => setActiveTab('applicants')}
        >
          Applicants
        </div>
        <div 
          style={tabStyle(activeTab === 'company-profile')}
          onClick={() => setActiveTab('company-profile')}
        >
          Company Profile
        </div>
      </motion.div>
      
      {activeTab === 'dashboard' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={dashboardStatsStyle}>
            <motion.div 
              style={statCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div style={statNumberStyle}>3</div>
              <div style={statLabelStyle}>Active Job Postings</div>
            </motion.div>
            
            <motion.div 
              style={statCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div style={statNumberStyle}>54</div>
              <div style={statLabelStyle}>Total Applications</div>
            </motion.div>
            
            <motion.div 
              style={statCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div style={statNumberStyle}>12</div>
              <div style={statLabelStyle}>Interviews Scheduled</div>
            </motion.div>
            
            <motion.div 
              style={statCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div style={statNumberStyle}>5</div>
              <div style={statLabelStyle}>Positions Filled</div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div style={sectionTitleStyle}>Your Job Postings</div>
            <div style={jobListStyle}>
              {postedJobs.map((job, index) => (
                <motion.div 
                  key={job.id}
                  style={jobCardStyle}
                  whileHover={{ scale: 1.01, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div style={jobInfoStyle}>
                    <div style={jobTitleStyle}>{job.title}</div>
                    <div style={jobDetailsStyle}>
                      <div>{job.location}</div>
                      <div>•</div>
                      <div>{job.salary}</div>
                      <div>•</div>
                      <div>Posted {job.postedDate}</div>
                    </div>
                    <div style={jobStatsStyle}>
                      <div style={statBadgeStyle(job.status)}>
                        {job.status === 'active' ? 'Active' : 'Closed'}
                      </div>
                      <div style={{
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        backgroundColor: '#f1f8e9',
                        color: '#689f38'
                      }}>
                        {job.applications} Applications
                      </div>
                    </div>
                  </div>
                  <div>
                    <motion.button 
                      style={actionButtonStyle(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {activeTab === 'post-job' && (
        <motion.div
          style={formStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={sectionTitleStyle}>Post a New Job</div>
          <form onSubmit={handleSubmit}>
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="title">Job Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                style={inputStyle} 
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                style={inputStyle} 
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Mumbai, India or Remote"
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="salary">Salary Range</label>
              <input 
                type="text" 
                id="salary" 
                name="salary" 
                style={inputStyle} 
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. ₹8,00,000 - ₹12,00,000 PA"
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="description">Job Description</label>
              <textarea 
                id="description" 
                name="description" 
                style={textareaStyle} 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the job role, responsibilities, and requirements..."
                required
              />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle} htmlFor="requirements">Skills & Requirements</label>
              <textarea 
                id="requirements" 
                name="requirements" 
                style={textareaStyle} 
                value={formData.requirements}
                onChange={handleInputChange}
                placeholder="List the required skills, qualifications, and experience (one per line)..."
                required
              />
            </div>
            
            <motion.button 
              type="submit" 
              style={submitButtonStyle}
              whileHover={{ scale: 1.05, backgroundColor: '#c0392b' }}
              whileTap={{ scale: 0.95 }}
            >
              Post Job
            </motion.button>
          </form>
        </motion.div>
      )}
      
      {activeTab === 'applicants' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={sectionTitleStyle}>Recent Applicants</div>
          
          {applicants.map((applicant, index) => (
            <motion.div 
              key={applicant.id}
              style={applicantCardStyle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
            >
              <div style={applicantHeaderStyle}>
                <div>
                  <div style={applicantNameStyle}>{applicant.name}</div>
                  <div style={applicantJobStyle}>Applied for {applicant.jobTitle}</div>
                </div>
                <div style={{
                  padding: '0.3rem 0.8rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  backgroundColor: applicant.status === 'shortlisted' ? '#f1f8e9' : '#e1f5fe',
                  color: applicant.status === 'shortlisted' ? '#689f38' : '#0288d1'
                }}>
                  {applicant.status === 'shortlisted' ? 'Shortlisted' : 'Pending Review'}
                </div>
              </div>
              
              <div style={applicantDetailsStyle}>
                <div style={applicantDetailItemStyle}>
                  <div style={applicantDetailLabelStyle}>Experience</div>
                  <div style={applicantDetailValueStyle}>{applicant.experience}</div>
                </div>
                
                <div style={applicantDetailItemStyle}>
                  <div style={applicantDetailLabelStyle}>Applied</div>
                  <div style={applicantDetailValueStyle}>{applicant.appliedDate}</div>
                </div>
              </div>
              
              <div style={skillsContainerStyle}>
                {applicant.skills.map((skill, i) => (
                  <div key={i} style={skillTagStyle}>{skill}</div>
                ))}
              </div>
              
              <div style={applicantFooterStyle}>
                <div style={applicantDateStyle}>
                  {applicant.status === 'shortlisted' ? 'Shortlisted 1 day ago' : 'Waiting for review'}
                </div>
                <div style={applicantActionsStyle}>
                  <motion.button 
                    style={actionButtonStyle(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Profile
                  </motion.button>
                  
                  <motion.button 
                    style={actionButtonStyle(true)}
                    whileHover={{ scale: 1.05, backgroundColor: '#c0392b' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {applicant.status === 'shortlisted' ? 'Schedule Interview' : 'Shortlist'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {activeTab === 'company-profile' && (
        <motion.div
          style={formStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={sectionTitleStyle}>Company Profile</div>
          <p style={{ marginBottom: '2rem', color: '#7f8c8d' }}>
            Update your company information to attract the best talent.
          </p>
          
          <form>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Company Name</label>
              <input type="text" style={inputStyle} defaultValue="TechCorp Inc." />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Industry</label>
              <input type="text" style={inputStyle} defaultValue="Information Technology" />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Company Size</label>
              <input type="text" style={inputStyle} defaultValue="50-200 employees" />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Website</label>
              <input type="url" style={inputStyle} defaultValue="https://techcorp.example.com" />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>Headquarters</label>
              <input type="text" style={inputStyle} defaultValue="Mumbai, India" />
            </div>
            
            <div style={formGroupStyle}>
              <label style={labelStyle}>About Company</label>
              <textarea style={textareaStyle} defaultValue="TechCorp Inc. is a leading technology company specializing in innovative software solutions for businesses of all sizes. Founded in 2010, we've grown to become a trusted partner for digital transformation initiatives across various industries." />
            </div>
            
            <motion.button 
              type="button" 
              style={submitButtonStyle}
              whileHover={{ scale: 1.05, backgroundColor: '#c0392b' }}
              whileTap={{ scale: 0.95 }}
            >
              Save Changes
            </motion.button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default CompanyHome;
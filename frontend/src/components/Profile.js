import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  // State for resume upload process
  const [, setResumeUploading] = useState(false);
  const [, setResumeUploadError] = useState('');
  
  // Handle resume upload
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check if file is a PDF
    if (file.type !== 'application/pdf') {
      setResumeUploadError('Please upload a PDF file');
      alert('Please upload a PDF file');
      return;
    }
    
    try {
      setResumeUploading(true);
      setResumeUploadError('');
      
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        throw new Error('User not authenticated');
      }
      
      console.log('Uploading resume for user:', user._id);
      console.log('File:', file.name, file.type, file.size);
      
      // Create form data
      const formData = new FormData();
      formData.append('resume', file);
      
      // Send request to upload resume
      const response = await fetch(`http://localhost:5000/api/users/upload-resume/${user._id}`, {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - browser will set it with boundary for multipart/form-data
      });
      
      console.log('Upload response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing response:', e);
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload resume');
      }
      
      console.log('Upload successful:', data);
      
      // Update profile with new resume URL
      setProfile(prev => ({
        ...prev,
        resume: data.resume
      }));
      
      // Update user in localStorage
      const updatedUser = { ...user, resume: data.resume };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Resume uploaded successfully!');
    } catch (err) {
      console.error('Resume upload error:', err);
      setResumeUploadError(err.message || 'Failed to upload resume');
      alert('Failed to upload resume: ' + err.message);
    } finally {
      setResumeUploading(false);
    }
  };
  
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    location: '',
    email: '',
    phone: '',
    about: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    profileImage: '',
    resume: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(loggedInUser);
    
    // Fetch user profile data from the server
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/users/profile/${user._id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const userData = await response.json();
        
        // Set profile data
        setProfile({
          name: userData.name || '',
          title: userData.title || '',
          location: userData.location || '',
          email: userData.email || '',
          phone: userData.phone || '',
          about: userData.about || '',
          experience: userData.experience || [],
          education: userData.education || [],
          skills: userData.skills || [],
          projects: userData.projects || [],
          languages: userData.languages || [],
          certifications: userData.certifications || [],
          profileImage: userData.profileImage || '',
          resume: userData.resume || ''
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again later.');
        
        // If we can't fetch from the server, use the data from localStorage as fallback
        setProfile({
          name: user.name || '',
          title: user.title || '',
          location: user.location || '',
          email: user.email || '',
          phone: user.phone || '',
          about: user.about || '',
          experience: user.experience || [],
          education: user.education || [],
          skills: user.skills || [],
          projects: user.projects || [],
          languages: user.languages || [],
          certifications: user.certifications || [],
          profileImage: user.profileImage || '',
          resume: user.resume || ''
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);

  // Styles (matching Home.js styling)
  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '"Segoe UI", Arial, sans-serif',
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

  const navLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = (primary = false) => ({
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    backgroundColor: primary ? '#2c3e50' : 'transparent',
    color: primary ? 'white' : '#2c3e50',
    border: primary ? 'none' : '1px solid #2c3e50',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  });

  const mainContainerStyle = {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 1.5rem',
  };

  const profileHeaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '3rem',
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1.5rem',
    border: '5px solid #f8f9fa',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  };

  const nameStyle = {
    fontSize: '2.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  };

  const titleStyle = {
    fontSize: '1.3rem',
    color: '#7f8c8d',
    marginBottom: '1rem',
  };

  const locationStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#7f8c8d',
    marginBottom: '1.5rem',
  };

  const contactInfoStyle = {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1.5rem',
  };

  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#7f8c8d',
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  };

  const sectionTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    borderBottom: '2px solid #e74c3c',
    paddingBottom: '0.5rem',
    display: 'inline-block',
  };

  const aboutTextStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#34495e',
  };

  const cardStyle = {
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: '1px solid #ecf0f1',
    transition: 'all 0.3s ease',
    backgroundColor: '#f8f9fa',
  };

  const cardTitleStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#2c3e50',
  };

  const cardSubtitleStyle = {
    fontSize: '1rem',
    color: '#e74c3c',
    marginBottom: '0.5rem',
  };

  const cardMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    color: '#7f8c8d',
    fontSize: '0.9rem',
  };

  const cardDescriptionStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    color: '#34495e',
  };

  const skillsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.8rem',
  };

  const skillTagStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#ecf0f1',
    borderRadius: '50px',
    fontSize: '0.9rem',
    color: '#2c3e50',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  };

  const projectCardStyle = {
    ...cardStyle,
    cursor: 'pointer',
  };

  const projectLinkStyle = {
    color: '#e74c3c',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
  };

  // Removed unused editButtonStyle

  const twoColumnStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
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
          <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>
            <span style={{ color: '#e74c3c' }}>Kaam</span>Khoj<span style={{ color: '#e74c3c' }}>.</span>in
          </Link>
        </motion.div>
        
        <motion.div 
          style={navLinksStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/" style={linkStyle}>Overview</Link>
          <Link to="/jobs" style={linkStyle}>Jobs</Link>
          <Link to="/company-home" style={linkStyle}>For companies</Link>
          <Link to="/profile" style={{...linkStyle, color: '#e74c3c', fontWeight: 'bold'}}>Profile</Link>
          <Link to="/" style={{ ...buttonStyle(false) }}>Log In</Link>
          <Link to="/" style={{ ...buttonStyle(true) }}>Sign Up</Link>
        </motion.div>
      </nav>

      {/* Main Content */}
      <div style={mainContainerStyle}>
        {/* Profile Header Section */}
        <motion.div 
          style={profileHeaderStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div style={{...avatarStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa'}}>
              Loading...
            </div>
          ) : (
            <div style={avatarStyle}>
              {profile.profileImage ? (
                <img 
                  src={`http://localhost:5000${profile.profileImage}`} 
                  alt={profile.name} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              ) : (
                profile.name ? profile.name.charAt(0).toUpperCase() : 'U'
              )}
            </div>
          )}
          {loading ? (
            <div style={{textAlign: 'center', padding: '1rem'}}>Loading profile information...</div>
          ) : error ? (
            <div style={{color: '#e74c3c', textAlign: 'center', padding: '1rem'}}>{error}</div>
          ) : (
            <>
              <h1 style={nameStyle}>{profile.name}</h1>
              <h2 style={titleStyle}>{profile.title || 'Add your professional title'}</h2>
              <div style={locationStyle}>
                <span role="img" aria-label="location">📍</span>
                <span>{profile.location || 'Add your location'}</span>
              </div>
              <div style={contactInfoStyle}>
                <div style={contactItemStyle}>
                  <span role="img" aria-label="email">📧</span>
                  <span>{profile.email}</span>
                </div>
                {profile.phone && (
                  <div style={contactItemStyle}>
                    <span role="img" aria-label="phone">📱</span>
                    <span>{profile.phone}</span>
                  </div>
                )}
              </div>
            </>
          )}
          <div style={{display: 'flex', gap: '1rem'}}>
            <label htmlFor="resume-upload" style={{...buttonStyle(true), display: 'inline-block', textAlign: 'center'}}>
              Upload Resume
              <input 
                id="resume-upload" 
                type="file" 
                accept=".pdf" 
                style={{display: 'none'}} 
                onChange={handleResumeUpload} 
              />
            </label>
            <button style={buttonStyle(false)}>Edit Profile</button>
          </div>
          
          {profile.resume && (
            <div style={{marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <p style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>Resume</p>
              <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <a 
                  href={`http://localhost:5000${profile.resume}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#2c3e50'}}
                >
                  <span style={{marginRight: '0.5rem', fontSize: '1.5rem'}}>📄</span>
                  View Resume
                </a>
              </div>
            </div>
          )}
        </motion.div>

        {/* About Section */}
        <motion.section 
          style={sectionStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 style={sectionTitleStyle}>About Me</h2>
          {loading ? (
            <div style={{textAlign: 'center', padding: '1rem'}}>Loading...</div>
          ) : (
            <p style={aboutTextStyle}>{profile.about || 'Add information about yourself, your experience, and your career goals.'}</p>
          )}
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          style={sectionStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 style={sectionTitleStyle}>Work Experience</h2>
          {loading ? (
            <div style={{textAlign: 'center', padding: '1rem'}}>Loading experience data...</div>
          ) : profile.experience && profile.experience.length > 0 ? (
            profile.experience.map((exp, index) => (
              <motion.div 
                key={exp.id || index} 
                style={cardStyle}
                whileHover={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
              >
                <h3 style={cardTitleStyle}>{exp.role}</h3>
                <h4 style={cardSubtitleStyle}>{exp.company}</h4>
                <div style={cardMetaStyle}>
                  <span>{exp.location}</span>
                  <span>{exp.duration}</span>
                </div>
                <p style={cardDescriptionStyle}>{exp.description}</p>
              </motion.div>
            ))
          ) : (
            <div style={{textAlign: 'center', padding: '1rem', color: '#7f8c8d'}}>
              No work experience added yet. Add your work history to showcase your professional journey.
            </div>
          )}
        </motion.section>

        {/* Two Column Layout for Education and Skills */}
        <div style={twoColumnStyle}>
          {/* Education Section */}
          <motion.section 
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 style={sectionTitleStyle}>Education</h2>
            {loading ? (
              <div style={{textAlign: 'center', padding: '1rem'}}>Loading education data...</div>
            ) : profile.education && profile.education.length > 0 ? (
              profile.education.map((edu, index) => (
                <motion.div 
                  key={edu.id || index} 
                  style={cardStyle}
                  whileHover={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                >
                  <h3 style={cardTitleStyle}>{edu.degree}</h3>
                  <h4 style={cardSubtitleStyle}>{edu.institution}</h4>
                  <div style={avatarStyle}>
                    {profile.profileImage ? (
                      <img 
                        src={`http://localhost:5000${profile.profileImage}`} 
                        alt={profile.name} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '50%'
                        }}
                      />
                    ) : (
                      profile.name ? profile.name.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <p style={cardDescriptionStyle}>{edu.description}</p>
                </motion.div>
              ))
            ) : (
              <div style={{textAlign: 'center', padding: '1rem', color: '#7f8c8d'}}>
                No education details added yet. Add your educational background to highlight your qualifications.
              </div>
            )}
          </motion.section>

          {/* Skills Section */}
          <motion.section 
            style={sectionStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 style={sectionTitleStyle}>Skills</h2>
            <div style={skillsContainerStyle}>
              {loading ? (
                <div style={{textAlign: 'center', padding: '1rem'}}>Loading skills...</div>
              ) : profile.skills && profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <motion.div 
                    key={index} 
                    style={skillTagStyle}
                    whileHover={{ backgroundColor: '#e74c3c', color: 'white' }}
                  >
                    {skill}
                  </motion.div>
                ))
              ) : (
                <div style={{padding: '1rem', color: '#7f8c8d'}}>
                  No skills added yet. Add your technical and professional skills to showcase your expertise.
                </div>
              )}
            </div>

            <h2 style={{...sectionTitleStyle, marginTop: '2rem'}}>Languages</h2>
            <div style={skillsContainerStyle}>
              {loading ? (
                <div style={{textAlign: 'center', padding: '1rem'}}>Loading languages...</div>
              ) : profile.languages && profile.languages.length > 0 ? (
                profile.languages.map((language, index) => (
                  <motion.div 
                    key={index} 
                    style={skillTagStyle}
                    whileHover={{ backgroundColor: '#e74c3c', color: 'white' }}
                  >
                    {language}
                  </motion.div>
                ))
              ) : (
                <div style={{padding: '1rem', color: '#7f8c8d'}}>
                  No languages added yet. Add the languages you speak to enhance your profile.
                </div>
              )}
            </div>

            <h2 style={{...sectionTitleStyle, marginTop: '2rem'}}>Certifications</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.8rem'}}>
              {loading ? (
                <div style={{textAlign: 'center', padding: '1rem'}}>Loading certifications...</div>
              ) : profile.certifications && profile.certifications.length > 0 ? (
                profile.certifications.map((cert, index) => (
                  <motion.div 
                    key={index} 
                    style={{...cardStyle, marginBottom: '0.5rem', padding: '1rem'}}
                    whileHover={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <span role="img" aria-label="certificate">🏆</span>
                      <span style={{fontWeight: '500'}}>{cert}</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{padding: '1rem', color: '#7f8c8d'}}>
                  No certifications added yet. Add your professional certifications to validate your skills.
                </div>
              )}
            </div>
          </motion.section>
        </div>

        {/* Projects Section */}
        <motion.section 
          style={sectionStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 style={sectionTitleStyle}>Projects</h2>
          <div style={twoColumnStyle}>
            {loading ? (
              <div style={{textAlign: 'center', padding: '1rem'}}>Loading projects...</div>
            ) : profile.projects && profile.projects.length > 0 ? (
              profile.projects.map((project, index) => (
                <motion.div 
                  key={project.id || index} 
                  style={projectCardStyle}
                  whileHover={{ boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                >
                  <h3 style={cardTitleStyle}>{project.title}</h3>
                  <p style={cardDescriptionStyle}>{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={projectLinkStyle}>
                      View Project <span>→</span>
                    </a>
                  )}
                </motion.div>
              ))
            ) : (
              <div style={{textAlign: 'center', padding: '1rem', color: '#7f8c8d'}}>
                No projects added yet. Showcase your work by adding projects you've completed.
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '3rem 2rem',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '2rem'
        }}>
          <div style={{
            flex: '1 1 300px'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '1rem'
            }}>
              <span style={{ color: '#e74c3c' }}>Kaam</span>Khoj<span style={{ color: '#e74c3c' }}>.</span>in
            </h2>
            <p style={{
              color: '#bdc3c7',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Find your dream job or the perfect candidate with KaamKhoj. We connect talented professionals with great companies.
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem'
            }}>
              {['📱', '💻', '📧', '📍'].map((icon, i) => (
                <div key={i} style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              For Job Seekers
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Browse Jobs', 'Create Profile', 'Job Alerts', 'Career Advice', 'Salary Guide'].map((item, i) => (
                <li key={i} style={{
                  marginBottom: '0.8rem'
                }}>
                  <Link to="/" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              For Employers
            </h3>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0
            }}>
              {['Post a Job', 'Browse Candidates', 'Pricing', 'Enterprise Solutions', 'Recruitment Tools'].map((item, i) => (
                <li key={i} style={{
                  marginBottom: '0.8rem'
                }}>
                  <Link to="/company-home" style={{
                    color: '#bdc3c7',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              Contact Us
            </h3>
            <p style={{
              color: '#bdc3c7',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Have questions or feedback? Reach out to our team.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem'
            }}>
              <div style={{ color: '#bdc3c7' }}>📞 +91 1234567890</div>
              <div style={{ color: '#bdc3c7' }}>📧 contact@kaamkhoj.in</div>
              <div style={{ color: '#bdc3c7' }}>📍 Mumbai, India</div>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: '#bdc3c7',
          fontSize: '0.9rem',
          marginTop: '2rem'
        }}>
          <p>© {new Date().getFullYear()} KaamKhoj.in. All rights reserved.</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1rem'
          }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((item, i) => (
              <Link key={i} to="/" style={{
                color: '#bdc3c7',
                textDecoration: 'none'
              }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
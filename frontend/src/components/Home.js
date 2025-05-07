import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import graffitiBg from '../Graffiti-Art-Background-With-Throw-Up-And-Tagging-Hand-Drawn-Style-Mural-Wallpaper-M.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user from localStorage
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to home
    navigate('/');
  };
  // Styles
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

  const heroSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${graffitiBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    minHeight: '600px',
    position: 'relative',
  };

  const headingStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    maxWidth: '800px',
  };

  const subheadingStyle = {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    maxWidth: '700px',
    lineHeight: '1.6',
  };

  const searchContainerStyle = {
    width: '100%',
    maxWidth: '700px',
    marginBottom: '2rem',
  };

  const searchInputStyle = {
    width: '100%',
    padding: '1.2rem',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  };

  const ctaButtonsStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const ctaButtonStyle = (primary = true) => ({
    padding: '1rem 2rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    backgroundColor: primary ? 'white' : 'transparent',
    color: primary ? '#2c3e50' : 'white',
    border: primary ? 'none' : '1px solid white',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  });

  const scrollIndicatorStyle = {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'white',
    opacity: 0.8,
  };

  const arrowStyle = {
    fontSize: '1.5rem',
    animation: 'bounce 2s infinite',
  };

  return (
    <div style={pageStyle}>
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
          
          {user ? (
            <>
              <Link to="/profile" style={{...linkStyle, color: '#e74c3c', fontWeight: 'bold'}}>Profile</Link>
              <button 
                onClick={handleLogout}
                style={{
                  ...buttonStyle(false),
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ ...buttonStyle(false) }}>Log In</Link>
              <Link to="/signup" style={{ ...buttonStyle(true) }}>Sign Up</Link>
            </>
          )}
        </motion.div>
      </nav>
      
      <section style={heroSectionStyle}>
        <motion.h1 
          style={headingStyle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Find the job made for you.
        </motion.h1>
        
        <motion.p 
          style={subheadingStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          We make it easy to find what's next.
          Browse over 100,000 jobs — from top companies to fast-growing startups.
        </motion.p>
        
        <motion.div 
          style={searchContainerStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <input 
            type="text" 
            placeholder="Search for jobs, skills, or companies..." 
            style={searchInputStyle}
          />
        </motion.div>
        
        <motion.div 
          style={ctaButtonsStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link to="/" style={{ ...ctaButtonStyle(true) }}>
            Create your profile
          </Link>
          <Link to="/jobs" style={{ ...ctaButtonStyle(false) }}>
            Browse jobs
          </Link>
        </motion.div>
        
        <motion.div 
          style={scrollIndicatorStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div>Scroll to explore</div>
          <div style={arrowStyle}>↓</div>
        </motion.div>
      </section>
      
      {/* Featured Recruiters Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <motion.h2 
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: '#2c3e50'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Top Companies Hiring Now
        </motion.h2>
        
        <motion.div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            { name: 'TechCorp', logo: 'TC', color: '#3498db', jobs: 42 },
            { name: 'InnovateX', logo: 'IX', color: '#e74c3c', jobs: 28 },
            { name: 'GlobalSys', logo: 'GS', color: '#2ecc71', jobs: 35 },
            { name: 'DataFlow', logo: 'DF', color: '#f39c12', jobs: 19 },
            { name: 'NexusAI', logo: 'NA', color: '#9b59b6', jobs: 23 }
          ].map((company, index) => (
            <motion.div 
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '200px'
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '10px',
                backgroundColor: company.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                marginBottom: '1rem'
              }}>
                {company.logo}
              </div>
              <div style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {company.name}
              </div>
              <div style={{
                color: '#7f8c8d',
                fontSize: '0.9rem'
              }}>
                {company.jobs} open positions
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      
      {/* Why Choose Us Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: '#f8f9fa',
        textAlign: 'center'
      }}>
        <motion.h2 
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#2c3e50'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Why Choose KaamKhoj?
        </motion.h2>
        
        <motion.p 
          style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We're connecting top talent with the best opportunities across India
        </motion.p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              icon: '🔍',
              title: 'Smart Matching',
              description: 'Our AI-powered algorithm connects you with jobs that match your skills and preferences.'
            },
            {
              icon: '⚡',
              title: 'Fast Application',
              description: 'Apply to multiple jobs with just a few clicks. No more lengthy application forms.'
            },
            {
              icon: '💼',
              title: 'Top Companies',
              description: 'Access opportunities from startups to Fortune 500 companies across India.'
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#2c3e50'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#7f8c8d',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: 'white',
        textAlign: 'center'
      }}>
        <motion.h2 
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#2c3e50'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Success Stories
        </motion.h2>
        
        <motion.p 
          style={{
            fontSize: '1.1rem',
            color: '#7f8c8d',
            maxWidth: '700px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hear from professionals who found their dream jobs through KaamKhoj
        </motion.p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              name: 'Priya Sharma',
              role: 'Frontend Developer at TechCorp',
              image: 'PS',
              testimonial: 'KaamKhoj helped me find a job that perfectly matched my skills and career goals. The process was smooth and I received an offer within 2 weeks!'
            },
            {
              name: 'Rahul Verma',
              role: 'Product Manager at InnovateX',
              image: 'RV',
              testimonial: 'After struggling with other job portals, KaamKhoj connected me with quality opportunities that were actually relevant to my experience.'
            },
            {
              name: 'Neha Patel',
              role: 'Data Scientist at NexusAI',
              image: 'NP',
              testimonial: 'The personalized job recommendations were spot on! I found my dream role at a top AI company through KaamKhoj.'
            }
          ].map((testimonial, index) => (
            <motion.div 
              key={index}
              style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '10px',
                textAlign: 'left'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#e74c3c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  marginRight: '1rem'
                }}>
                  {testimonial.image}
                </div>
                <div>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#2c3e50'
                  }}>
                    {testimonial.name}
                  </div>
                  <div style={{
                    color: '#7f8c8d',
                    fontSize: '0.9rem'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p style={{
                color: '#34495e',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}>
                "{testimonial.testimonial}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Stats Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #2c3e50 0%, #4a6b8a 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <motion.h2 
          style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '3rem'
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          KaamKhoj by the Numbers
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { number: '10,000+', label: 'Companies' },
            { number: '100,000+', label: 'Jobs Posted' },
            { number: '500,000+', label: 'Job Seekers' },
            { number: '50,000+', label: 'Success Stories' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: '#e74c3c'
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '1.1rem'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '4rem 2rem 2rem'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto 3rem'
        }}>
          <div>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#e74c3c' }}>Kaam</span>Khoj<span style={{ color: '#e74c3c' }}>.</span>in
            </div>
            <p style={{
              color: '#bdc3c7',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              Connecting talent with opportunity across India. Find your dream job or the perfect candidate with KaamKhoj.
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
          fontSize: '0.9rem'
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

export default Home;
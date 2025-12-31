import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/career.css';

const CareerOverView = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [aiGenerated, setAiGenerated] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  // Helper: Sanitize text to prevent XSS
  const sanitizeText = (text, maxLength = 200) => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/[<>]/g, '')
      .substring(0, maxLength);
  };

  // Helper: Extract numeric value from salary string
  const extractSalaryNumber = (salaryStr) => {
    if (!salaryStr) return 0;
    const matches = salaryStr.match(/\$([\d,]+)/g);
    if (!matches || matches.length === 0) return 0;
    
    // Take the highest number in range
    const numbers = matches.map(match => 
      parseInt(match.replace(/[$,]/g, ''), 10)
    ).filter(num => !isNaN(num));
    
    return numbers.length > 0 ? Math.max(...numbers) : 0;
  };

  // Helper: Calculate salary percentage for chart
  const getSalaryPercentage = (salaryStr, country) => {
    const amount = extractSalaryNumber(salaryStr);
    if (!amount) return 30;
    
    const base = country === 'jordan' ? 3000 : 8000;
    const percentage = Math.min((amount / base) * 100, 100);
    return Math.max(percentage, 10);
  };

  // Helper: Calculate skills match percentage
  const calculateSkillsMatch = (job, userSkills = []) => {
    if (!job.skills_needed || !Array.isArray(job.skills_needed)) return 0;
    if (!userSkills.length) return 0;
    
    const jobSkills = job.skills_needed.map(s => s.toLowerCase());
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    
    const matches = jobSkills.filter(skill => 
      userSkillsLower.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
    ).length;
    
    return Math.round((matches / jobSkills.length) * 100);
  };

  // Helper: Get skill level indicator
  const getSkillLevel = (skill, userSkills = []) => {
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const skillLower = skill.toLowerCase();
    
    const hasSkill = userSkillsLower.some(userSkill => 
      userSkill.includes(skillLower) || skillLower.includes(userSkill)
    );
    
    return hasSkill ? '✓' : '☆';
  };

  // Helper: Generate course image URL
  const getCourseImageUrl = (course) => {
    // Return default if no image
    const platformColors = {
      'Udemy': { bg: 'A435F0', text: 'FFFFFF' },
      'Coursera': { bg: '0056D2', text: 'FFFFFF' },
      'edX': { bg: '008C8C', text: 'FFFFFF' },
      'LinkedIn Learning': { bg: '0077B5', text: 'FFFFFF' },
      'freeCodeCamp': { bg: '0A0A23', text: 'FFFFFF' },
      'DataCamp': { bg: '03EF62', text: '000000' },
      'Pluralsight': { bg: 'F15B2A', text: 'FFFFFF' },
      'Skillshare': { bg: '000000', text: 'FFFFFF' }
    };
    
    const platform = course.platform || 'Course';
    const colors = platformColors[platform] || { bg: '2563eb', text: 'FFFFFF' };
    const text = encodeURIComponent(platform.substring(0, 10));
    
    return `https://placehold.co/300x200/${colors.bg}/${colors.text}?text=${text}`;
  };

  // Helper: Generate fallback recommendations
  const generateFallbackRecommendations = (userData) => {
    const passion = userData?.passion || 'technology';
    
    const fallbackJobs = [
      {
        role: "Frontend Developer",
        description: `Based on your interest in ${passion}, frontend development offers creative opportunities to build interactive websites and applications with modern frameworks like React and Vue.`,
        courses: [
          { 
            name: "The Complete Web Developer Bootcamp 2024", 
            platform: "Udemy", 
            url: "#",
            description: "Learn HTML, CSS, JavaScript, React, and more",
            duration: "65 hours",
            image: null
          },
          { 
            name: "React - The Complete Guide", 
            platform: "Udemy", 
            url: "#",
            description: "Master React.js from basics to advanced patterns",
            duration: "48 hours",
            image: null
          }
        ],
        skills_needed: ["JavaScript", "HTML/CSS", "React", "Git", "Responsive Design"],
        salaries: { jordan: "$800 - $2,800 monthly", uae: "$3,500 - $7,500 monthly" }
      },
      {
        role: "UI/UX Designer",
        description: "Design intuitive user experiences and beautiful interfaces for web and mobile applications, focusing on usability, accessibility, and visual appeal.",
        courses: [
          { 
            name: "Google UX Design Professional Certificate", 
            platform: "Coursera", 
            url: "#",
            description: "Learn UX research, wireframing, prototyping, and testing",
            duration: "6 months",
            image: null
          },
          { 
            name: "UI Design with Figma", 
            platform: "Coursera", 
            url: "#",
            description: "Master Figma for UI design, prototyping, and collaboration",
            duration: "30 hours",
            image: null
          }
        ],
        skills_needed: ["Figma", "User Research", "Wireframing", "Prototyping", "Visual Design"],
        salaries: { jordan: "$700 - $2,500 monthly", uae: "$2,800 - $6,000 monthly" }
      },
      {
        role: "Data Analyst",
        description: "Transform raw data into meaningful insights using statistical analysis, visualization tools, and business intelligence techniques to support decision-making.",
        courses: [
          { 
            name: "Google Data Analytics Professional Certificate", 
            platform: "Coursera", 
            url: "#",
            description: "Learn data cleaning, analysis, visualization, and R programming",
            duration: "6 months",
            image: null
          },
          { 
            name: "Python for Data Science and Machine Learning", 
            platform: "Udemy", 
            url: "#",
            description: "Master Python, Pandas, NumPy, Matplotlib, and Scikit-learn",
            duration: "44 hours",
            image: null
          }
        ],
        skills_needed: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
        salaries: { jordan: "$900 - $2,800 monthly", uae: "$3,800 - $7,800 monthly" }
      }
    ];
    
    return { jobs: fallbackJobs };
  };

  // Load career data from localStorage
  useEffect(() => {
    const loadCareerData = () => {
      setLoading(true);
      setError('');
      
      try {
        // Get stored data
        const storedRecs = localStorage.getItem('careerRecommendations');
        const storedUserData = localStorage.getItem('userCareerData');
        const aiFlag = localStorage.getItem('aiGenerated');
        
        // Validate data exists
        if (!storedRecs || !storedUserData) {
          throw new Error('No career data found. Please fill out the form first.');
        }

        // Parse and validate user data
        let parsedUserData;
        try {
          parsedUserData = JSON.parse(storedUserData);
          if (!parsedUserData || typeof parsedUserData !== 'object') {
            throw new Error('Invalid user data format');
          }
        } catch (parseError) {
          throw new Error('Failed to parse user data');
        }
        
        // Parse and clean AI response
        let parsedRecs;
        try {
          const rawRecs = storedRecs;
          const cleanedRecs = rawRecs.replace(/```json\s*|\s*```/g, '').trim();
          parsedRecs = JSON.parse(cleanedRecs);
        } catch (parseError) {
          console.log('Failed to parse AI response, using fallback');
          parsedRecs = generateFallbackRecommendations(parsedUserData);
        }
        
        // Validate recommendations structure
        if (!parsedRecs || !parsedRecs.jobs || !Array.isArray(parsedRecs.jobs)) {
          parsedRecs = generateFallbackRecommendations(parsedUserData);
        }
        
        // Ensure we have exactly 3 jobs
        if (parsedRecs.jobs.length > 3) {
          parsedRecs.jobs = parsedRecs.jobs.slice(0, 3);
        } else if (parsedRecs.jobs.length < 3) {
          const fallback = generateFallbackRecommendations(parsedUserData);
          parsedRecs.jobs = [...parsedRecs.jobs, ...fallback.jobs.slice(0, 3 - parsedRecs.jobs.length)];
        }
        
        // Set state
        setUserData(parsedUserData);
        setRecommendations(parsedRecs);
        setAiGenerated(aiFlag === 'true');
        
      } catch (err) {
        console.error('Error loading career data:', err.message);
        setError(err.message || 'Failed to load career recommendations');
        
        // Try to generate fallback with any available data
        try {
          const storedUserData = localStorage.getItem('userCareerData');
          if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            const fallback = generateFallbackRecommendations(userData);
            setRecommendations(fallback);
            setUserData(userData);
          }
        } catch (fallbackError) {
          console.error('Fallback also failed:', fallbackError);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCareerData();
    
    // Cleanup function
    return () => {
      // Reset states if needed
    };
  }, []);

  // Memoized skills match calculations
  const skillsMatches = useMemo(() => {
    if (!recommendations?.jobs || !userData?.skills) return {};
    
    const matches = {};
    recommendations.jobs.forEach((job, index) => {
      matches[index] = calculateSkillsMatch(job, userData.skills);
    });
    return matches;
  }, [recommendations, userData]);

  // Handle restart button
  const handleRestart = () => {
    // Clear all stored data
    localStorage.removeItem('careerRecommendations');
    localStorage.removeItem('userCareerData');
    localStorage.removeItem('aiGenerated');
    localStorage.removeItem('formSubmitted');
    localStorage.removeItem('aiTimestamp');
    
    // Navigate back to form
    navigate('/user');
  };

  // Handle print functionality
  const handlePrint = () => {
    if (window.printing) return;
    window.printing = true;
    
    setPrintMode(true);
    
    // Add print styles dynamically
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        .career-container,
        .career-container * {
          visibility: visible;
        }
        .career-container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          max-width: 100%;
          padding: 20px;
        }
        .action-section,
        .restart-btn,
        .print-btn {
          display: none !important;
        }
        .job-card {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 30px;
        }
      }
    `;
    
    document.head.appendChild(style);
    
    setTimeout(() => {
      window.print();
      
      // Cleanup after printing
      setTimeout(() => {
        const styleElement = document.getElementById('print-styles');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
        window.printing = false;
        setPrintMode(false);
      }, 500);
    }, 100);
  };

  // Open course link safely
  const openCourseLink = (url) => {
    if (!url || url === '#') return;
    
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // Show message for placeholder links
      alert('This is a placeholder link. In a real application, this would open the actual course page.');
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="career-container career-container-loading">
        <div className="loading-screen">
          <div className="spinner"></div>
          <h3>Preparing Your Career Recommendations</h3>
          <p>Analyzing your profile and generating personalized results...</p>
          <div className="loading-steps">
            <div className="loading-step active">✓ Loading your data</div>
            <div className="loading-step active">Analyzing skills</div>
            <div className="loading-step">Generating recommendations</div>
          </div>
        </div>
      </div>
    );
  }

  // Error screen
  if (error && (!recommendations || !recommendations.jobs || recommendations.jobs.length === 0)) {
    return (
      <div className="career-container career-container-error">
        <div className="error-screen">
          <div className="error-icon">⚠️</div>
          <h2>Unable to Load Recommendations</h2>
          <p className="error-message">{error}</p>
          <div className="error-actions">
            <button onClick={handleRestart} className="btn-primary btn-restart">
              ← Back to Career Form
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-secondary btn-retry"
            >
              ↻ Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!recommendations?.jobs || recommendations.jobs.length === 0) {
    return (
      <div className="career-container career-container-empty">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Career Recommendations Available</h3>
          <p>We couldn't generate career recommendations with the provided information.</p>
          <button onClick={handleRestart} className="btn-primary btn-restart">
            ↻ Start Over with Different Information
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className={`career-container ${printMode ? 'print-mode' : ''}`}>
      {/* Header Section */}
      <div className="career-header">
        <div className="header-content">
          <h1 className="career-title">
            <span className="title-icon"></span>
            Your Personalized Career Paths
          </h1>
          
          
          
          {/* User Info Summary */}
          {userData && (
            <div className="user-summary-card">
              <div className="user-profile">
                <div className="avatar-placeholder">
                  {userData.userInfo?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="user-details">
                  <h3 className="user-name">
                    {sanitizeText(userData.userInfo?.name || 'User', 30)}
                  </h3>
                  <div className="user-meta">
                    <span className="user-age">
                      <span className="meta-label">Age:</span> {userData.userInfo?.age || 'N/A'} years
                    </span>
                    <br />
                    <span className="user-email">
                      <span className="meta-label">Email:</span> {sanitizeText(userData.userInfo?.email, 25)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="user-passion-section">
                <div className="passion-label">
                  
                   Passions Selected:
                </div>
                <div className="passion-value">
                  {sanitizeText(userData.passion || 'Not specified', 50)}
                </div>
              </div>
              
              {userData.skills && userData.skills.length > 0 && (
                <div className="user-skills-section">
                  <div className="skills-label">
                    <span className="skills-icon">🛠️</span>
                     Skills Selected:
                  </div>
                  <div className="skills-tags">
                    {userData.skills.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className="user-skill-tag">
                        {sanitizeText(skill, 20)}
                      </span>
                    ))}
                    {userData.skills.length > 5 && (
                      <span className="user-skill-tag">
                        +{userData.skills.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* AI Generated Notice */}
          <div className={`ai-notice ${aiGenerated ? 'ai-active' : 'ai-fallback'}`}>
            {aiGenerated ? (
              <>
                <span className="ai-icon"></span>
                <span></span>
              </>
            ) : (
              <>
                <span className="fallback-icon">⚠️</span>
                <span>Using pre-defined recommendations (AI service unavailable)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Jobs Grid - 3 Cards */}
      <div className="jobs-section">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">💼</span>
            Recommended Career Paths
          </h2>
          <p className="section-description">
            Explore your top {recommendations.jobs.length} career matches with detailed information
          </p>
        </div>
        
        <div className="jobs-grid">
          {recommendations.jobs.map((job, index) => (
            <div className="job-card" key={index}>
              {/* Job Header with Rank */}
              <div className="job-card-header">
                <div className="job-rank-badge">
                  <span className="rank-number">#{index + 1}</span>
                  <span className="rank-label">Recommendation</span>
                </div>
                <div className="job-title-section">
                  <h3 className="job-title">{sanitizeText(job.role, 40)}</h3>
                  {skillsMatches[index] > 0 && (
                    <div className="skills-match-indicator">
                      <div className="match-progress">
                        <div 
                          className="match-progress-bar" 
                          style={{ width: `${skillsMatches[index]}%` }}
                        ></div>
                      </div>
                      <span className="match-percentage">{skillsMatches[index]}% match</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Job Description */}
              <div className="job-description-section">
                <div className="description-header">
                  <span className="description-icon"></span>
                  <h4>Career Overview</h4>
                </div>
                <div className="job-description-content">
                  <p>{sanitizeText(job.description, 300)}</p>
                </div>
              </div>
              
              {/* Required Skills */}
              {job.skills_needed && job.skills_needed.length > 0 && (
                <div className="skills-section">
                  <div className="skills-header">
                    <span className="skills-icon">🛠️</span>
                    <h4>Required Skills</h4>
                  </div>
                  <div className="skills-tags-container">
                    {job.skills_needed.map((skill, idx) => (
                      <div key={idx} className="skill-tag-item">
                        <span className="skill-name">{sanitizeText(skill, 20)}</span>
                        <span className="skill-level-indicator">
                          {getSkillLevel(skill, userData?.skills || [])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Salary Information */}
              <div className="salaries-section">
                <div className="salaries-header">
                  <span className="salaries-icon">
    </span>
                  <h4>Expected Monthly Salaries</h4>
                </div>
                
                {/* Salary Chart */}
                <div className="salary-chart">
                  <div className="chart-bars">
                    <div className="chart-bar">
                      <div className="bar-label">Jordan 🇯🇴</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill jordan-bar"
                          style={{ width: `${getSalaryPercentage(job.salaries?.jordan, 'jordan')}%` }}
                        >
                          <span className="bar-amount">
                            {job.salaries?.jordan || '$800 - $2,500'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="chart-bar">
                      <div className="bar-label">UAE 🇦🇪</div>
                      <div className="bar-container">
                        <div 
                          className="bar-fill uae-bar"
                          style={{ width: `${getSalaryPercentage(job.salaries?.uae, 'uae')}%` }}
                        >
                          <span className="bar-amount">
                            {job.salaries?.uae || '$3,000 - $6,000'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Salary Cards */}
                <div className="salaries-grid">
                  <div className="salary-card">
                    <div className="salary-country">
                      <span className="country-flag">🇯🇴</span>
                      <span className="country-name">Jordan</span>
                    </div>
                    <div className="salary-details">
                      <span className="salary-amount">
                        {job.salaries?.jordan || '$800 - $2,500'}
                      </span>
                      <span className="salary-period">monthly</span>
                      <small className="salary-note">Average for entry-level</small>
                    </div>
                  </div>
                  <div className="salary-card">
                    <div className="salary-country">
                      <span className="country-flag">🇦🇪</span>
                      <span className="country-name">UAE</span>
                    </div>
                    <div className="salary-details">
                      <span className="salary-amount">
                        {job.salaries?.uae || '$3,000 - $6,000'}
                      </span>
                      <span className="salary-period">monthly</span>
                      <small className="salary-note">Average for entry-level</small>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recommended Courses */}
              {job.courses && job.courses.length > 0 && (
                <div className="courses-section">
                  <div className="courses-header">
                    <span className="courses-icon">🎓</span>
                    <h4>Recommended Courses</h4>
                  </div>
                  
                  <div className="courses-grid">
                    {job.courses.map((course, idx) => (
                      <div 
                        className={`course-card ${course.url && course.url !== '#' ? 'clickable' : ''}`}
                        key={idx}
                        onClick={() => course.url && course.url !== '#' && openCourseLink(course.url)}
                        role={course.url && course.url !== '#' ? "button" : "presentation"}
                        tabIndex={course.url && course.url !== '#' ? 0 : -1}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && course.url && course.url !== '#') {
                            openCourseLink(course.url);
                          }
                        }}
                      >
                        <div className="course-image-container">
                          <img 
                            src={getCourseImageUrl(course)}
                            alt={course.platform || 'Course platform'}
                            className="course-image"
                            loading="lazy"
                            onError={(e) => {
                              e.target.src = 'https://placehold.co/300x200/2563eb/FFFFFF?text=Course';
                            }}
                          />
                          <div className="course-platform-tag">
                            {course.platform || 'Online'}
                          </div>
                          {course.duration && (
                            <div className="course-duration-badge">
                              ⏱️ {course.duration}
                            </div>
                          )}
                        </div>
                        
                        <div className="course-info">
                          <h5 className="course-title">
                            {sanitizeText(course.name, 60)}
                          </h5>
                          
                          {course.description && (
                            <p className="course-description">
                              {sanitizeText(course.description, 100)}
                            </p>
                          )}
                          
                          {course.url && course.url !== '#' ? (
                            <button className="course-action-btn">
                              View on {course.platform || 'Platform'} →
                            </button>
                          ) : (
                            <div className="course-placeholder">
                              Course link not available
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Section */}
      <div className="action-section">
        <div className="action-buttons-container">
          <button 
            onClick={handleRestart} 
            className="action-btn restart-btn"
            disabled={printMode}
          >
            <span className="btn-icon"></span>
            Explore More Careers
          </button>
          
          <button 
            onClick={handlePrint} 
            className="action-btn print-btn"
            disabled={printMode}
          >
            <span className="btn-icon">🖨️</span>
            Download as PDF 
          </button>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="scroll-top-btn"
          >
          
            Back to Top
          </button>
        </div>
        
        <div className="disclaimer-section">
          <div className="disclaimer-content">
            <p className="disclaimer-text">
              <strong>Note:</strong> These recommendations are generated based on the information you provided. 
              Salary ranges are estimates for entry-level positions in Jordan and UAE markets.
            </p>
            
  
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerOverView;
// UserInformation.jsx - ENHANCED PRODUCTION VERSION
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/user-info.css';
import { getCareerRecommendations } from '../services/chatgptService';

const UserInformation = () => {
  const navigate = useNavigate();
  
  // Form states
  const [selectedPassion, setSelectedPassion] = useState('');
  const [otherPassion, setOtherPassion] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    age: ''
  });
  
  // Loading & Error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  // Available passions for better UX
  const PASSIONS = [
    "Computer Science / Software Engineering",
    "Engineering (Civil, Electrical, Mechanical)",
    "Art & Design",
    "Cooking & Culinary Arts",
    "Business & Finance",
    "Accounting",
    "Healthcare & Medicine",
    "Marketing & Advertising",
    "Education & Teaching",
    "Architecture & Interior Design"
  ];

  // Available skills
  const SKILLS = [
    "Communication (speaking & writing)",
    "Teamwork & Collaboration",
    "Time Management",
    "Art & Design",
    "Basic Computer Use",
    "Problem Solving",
    "Organization & Planning",
    "Customer Interaction",
    "Presentation Skills",
    "Leadership",
    "Critical Thinking",
    "Research Skills",
    "Creativity & Innovation"
  ];

  // Load saved form data
  useEffect(() => {
    const savedFormData = localStorage.getItem('jobwise_form_draft');
    if (savedFormData) {
      try {
        const data = JSON.parse(savedFormData);
        setSelectedPassion(data.selectedPassion || '');
        setOtherPassion(data.otherPassion || '');
        setSelectedSkills(data.selectedSkills || []);
        setOtherSkill(data.otherSkill || '');
        setUserInfo(data.userInfo || { email: '', username: '', age: '' });
      } catch (error) {
        console.log('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save form data on changes
  useEffect(() => {
    const formData = {
      selectedPassion,
      otherPassion,
      selectedSkills,
      otherSkill,
      userInfo
    };
    
    // Throttle saving to prevent too many writes
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('jobwise_form_draft', JSON.stringify(formData));
    }, 500);
    
    return () => clearTimeout(saveTimeout);
  }, [selectedPassion, otherPassion, selectedSkills, otherSkill, userInfo]);

  // Handle passion radio change
  const handleRadioChange = useCallback((e) => {
    const value = e.target.value;
    setSelectedPassion(value);
    setOtherPassion('');
    setError('');
  }, []);

  // Handle other passion text change
  const handleOtherChange = useCallback((e) => {
    const value = e.target.value.substring(0, 50); // Limit length
    setOtherPassion(value);
    if (value) {
      setSelectedPassion('');
    }
    setError('');
  }, []);

  // Handle skill checkbox change
  const handleSkillChange = useCallback((e) => {
    const { value, checked } = e.target;
    setSelectedSkills(prev => {
      if (checked) {
        return [...prev, value].slice(0, 10); // Limit to 10 skills
      } else {
        return prev.filter(skill => skill !== value);
      }
    });
  }, []);

  // Handle other skill text change
  const handleOtherSkillChange = useCallback((e) => {
    setOtherSkill(e.target.value.substring(0, 50));
  }, []);

  // Handle user info input change with validation
  const handleUserInfoChange = useCallback((e) => {
    const { name, value } = e.target;
    
    let sanitizedValue = value;
    
    // Special handling for each field
    switch (name) {
      case 'email':
        sanitizedValue = value.toLowerCase().trim();
        break;
      case 'username':
        sanitizedValue = value.trim().substring(0, 50);
        break;
      case 'age':
        // Only allow numbers and ensure within range
        const numValue = parseInt(value, 10);
        if (value === '') {
          sanitizedValue = '';
        } else if (!isNaN(numValue)) {
          sanitizedValue = Math.min(Math.max(numValue, 15), 80).toString();
        } else {
          return; // Don't update if not a number
        }
        break;
      default:
        sanitizedValue = value;
    }
    
    setUserInfo(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
    
    // Clear error when user fixes the issue
    if (error) {
      const validationError = validateFormWithData({
        ...userInfo,
        [name]: sanitizedValue
      }, selectedPassion, otherPassion, selectedSkills, otherSkill);
      if (!validationError) {
        setError('');
      }
    }
  }, [error, userInfo, selectedPassion, otherPassion, selectedSkills, otherSkill]);

  // Validate form data with specific field focus
  const validateFormWithData = useCallback((userInfo, passion, otherPassion, skills, otherSkill) => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userInfo.email || !emailRegex.test(userInfo.email)) {
      return 'Please enter a valid email address';
    }
    
    // Name validation
    if (!userInfo.username || userInfo.username.trim().length < 2) {
      return 'Please enter your full name (minimum 2 characters)';
    }
    
    // Age validation
    if (!userInfo.age) {
      return 'Please enter your age';
    }
    const ageNum = parseInt(userInfo.age, 10);
    if (isNaN(ageNum) || ageNum < 15 || ageNum > 80) {
      return 'Please enter a valid age between 15 and 80';
    }
    
    // Passion validation
    if (!passion && (!otherPassion || otherPassion.trim().length < 3)) {
      return 'Please select or enter your passion (minimum 3 characters)';
    }
    
    // Skills validation
    const totalSkills = skills.length + (otherSkill.trim() ? 1 : 0);
    if (totalSkills === 0) {
      return 'Please select at least one skill or enter your own';
    }
    if (totalSkills > 10) {
      return 'Please select no more than 10 skills';
    }
    
    return null;
  }, []);

  // Validate form
  const validateForm = useCallback(() => {
    return validateFormWithData(userInfo, selectedPassion, otherPassion, selectedSkills, otherSkill);
  }, [userInfo, selectedPassion, otherPassion, selectedSkills, otherSkill, validateFormWithData]);

  // Prepare form data for API
  const prepareFormData = useCallback(() => {
    return {
      userInfo: {
        email: userInfo.email.trim(),
        name: userInfo.username.trim(),
        age: parseInt(userInfo.age, 10) || 0
      },
      passion: selectedPassion || otherPassion.trim(),
      skills: [
        ...selectedSkills,
        ...(otherSkill.trim() ? [otherSkill.trim()] : [])
      ]
    };
  }, [userInfo, selectedPassion, otherPassion, selectedSkills, otherSkill]);

  // Check if form is valid (memoized for performance)
  const isFormValid = useMemo(() => {
    const validationError = validateForm();
    return validationError === null;
  }, [validateForm]);

  // Main submit handler
  const handleSubmit = async () => {
    // Validate form first
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsLoading(true);
    setError('');
    setShowSuccess(false);
    setProgress(0);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const formData = prepareFormData();
      
      // Clear old data
      localStorage.removeItem('careerRecommendations');
      localStorage.removeItem('userCareerData');
      localStorage.removeItem('aiGenerated');
      localStorage.removeItem('aiTimestamp');
      
      // Store basic data for CareerView fallback
      localStorage.setItem('userCareerData', JSON.stringify(formData));
      localStorage.setItem('formSubmitted', Date.now().toString());

      // Show immediate feedback
      setShowSuccess(true);

      // Call AI API
      const recommendations = await getCareerRecommendations(formData);
      
      // Store AI response
      localStorage.setItem('careerRecommendations', JSON.stringify(recommendations));
      localStorage.setItem('aiGenerated', 'true');
      localStorage.setItem('aiTimestamp', new Date().toISOString());
      
      // Clear draft
      localStorage.removeItem('jobwise_form_draft');
      
      // Complete progress
      setProgress(100);
      clearInterval(progressInterval);
      
      // Add small delay for better UX
      setTimeout(() => {
        navigate('/career');
      }, 800);

    } catch (apiError) {
      console.error('AI API Error:', apiError);
      clearInterval(progressInterval);
      
      // Handle specific error cases
      let errorMessage = 'Failed to get AI recommendations. ';
      
      if (apiError.message?.includes('API key') || apiError.message?.includes('API_KEY')) {
        errorMessage = 'API configuration issue. Using enhanced recommendations instead.';
        localStorage.setItem('aiGenerated', 'false');
        
        // Still navigate but with fallback flag
        setTimeout(() => navigate('/career'), 1000);
      } else if (apiError.message?.includes('network') || apiError.message?.includes('Network')) {
        errorMessage = 'Network error. Please check your internet connection.';
        localStorage.setItem('aiGenerated', 'false');
        setTimeout(() => navigate('/career'), 1000);
      } else if (apiError.message?.includes('rate limit') || apiError.message?.includes('429')) {
        errorMessage = 'Temporarily unavailable due to high demand. Using enhanced recommendations.';
        localStorage.setItem('aiGenerated', 'false');
        setTimeout(() => navigate('/career'), 1000);
      } else {
        errorMessage = 'AI service temporarily unavailable. Using enhanced recommendations.';
        localStorage.setItem('aiGenerated', 'false');
        setTimeout(() => navigate('/career'), 1000);
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isFormValid && !isLoading) {
        e.preventDefault();
        handleSubmit();
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isFormValid, isLoading]);

  // Clear form
  const handleClearForm = () => {
    setSelectedPassion('');
    setOtherPassion('');
    setSelectedSkills([]);
    setOtherSkill('');
    setUserInfo({
      email: '',
      username: '',
      age: ''
    });
    setError('');
    localStorage.removeItem('jobwise_form_draft');
  };

  // Get passion icon
  const getPassionIcon = (passion) => {
    const icons = {
      "Computer Science": "💻",
      "Engineering": "⚙️",
      "Art & Design": "🎨",
      "Cooking": "👨‍🍳",
      "Business": "💼",
      "Accounting": "📊",
      "Healthcare": "🏥",
      "Marketing": "📢",
      "Education": "📚",
      "Architecture": "🏛️"
    };
    
    for (const [key, icon] of Object.entries(icons)) {
      if (passion.includes(key)) return icon;
    }
    return "🌟";
  };

  return (
    <div className="user-info-container">
      {/* Success Message */}
      {showSuccess && (
        <div className="success-message-overlay">
          <div className="success-message-card">
            <div className="success-icon-animated">✨</div>
            <h3>Form Submitted Successfully!</h3>
            <p>AI is analyzing your profile to find perfect career matches...</p>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{progress}% complete</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message-overlay">
          <div className="error-message-card">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <h4>Attention Required</h4>
              <p>{error}</p>
            </div>
            <button 
              className="error-close-btn" 
              onClick={() => setError('')}
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="ai-processing-modal">
            <div className="spinner-large"></div>
            <h4>🤖 JobWise AI Assistant is Working</h4>
            <p>Analyzing your profile to find perfect career matches...</p>
            
            <div className="loading-steps-container">
              <div className="loading-step">
                <div className="step-check">✓</div>
                <div className="step-content">
                  <div className="step-title">Processing your data</div>
                  <div className="step-description">Validating and structuring information</div>
                </div>
              </div>
              
              <div className="loading-step active">
                <div className="step-check">↻</div>
                <div className="step-content">
                  <div className="step-title">Connecting to AI Engine</div>
                  <div className="step-description">Communicating with Google Gemma 3</div>
                </div>
              </div>
              
              <div className="loading-step">
                <div className="step-check"></div>
                <div className="step-content">
                  <div className="step-title">Generating Recommendations</div>
                  <div className="step-description">Creating personalized career paths</div>
                </div>
              </div>
            </div>
            
            <div className="estimated-time-badge">
              <span className="time-icon">⏱️</span>
              Estimated time: 10-20 seconds
            </div>
          </div>
        </div>
      )}

      <div className="user-info-content">
        <div className="user-info-grid">
          {/* Left Column - Form */}
          <div className="form-column">
            <div className="form-header">
              <h1 className="form-title">
                <span className="title-icon">👤</span>
                Tell Us About Yourself
              </h1>
              <p className="form-subtitle">
                Fill in your details to get personalized career recommendations powered by AI
              </p>
              
              <div className="form-progress">
                <div className="progress-steps">
                  <div className="progress-step active">1. Personal Info</div>
                  <div className="progress-step">2. Passions</div>
                  <div className="progress-step">3. Skills</div>
                  <div className="progress-step">4. Results</div>
                </div>
              </div>
            </div>

            {/* User Information Section */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">📝</span>
                  Personal Information
                </h2>
                <p className="section-description">
                  We need some basic information to personalize your experience
                </p>
              </div>

              <div className="input-grid">
                <div className="input-group">
                  <label htmlFor="email" className="input-label">
                    Email Address <span className="required">*</span>
                    <span className="input-hint">We'll never share your email</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                    required
                    disabled={isLoading}
                    className="input-field"
                    autoComplete="email"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="username" className="input-label">
                    Full Name <span className="required">*</span>
                    <span className="input-hint">As you'd like to be addressed</span>
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    value={userInfo.username}
                    onChange={handleUserInfoChange}
                    required
                    disabled={isLoading}
                    className="input-field"
                    autoComplete="name"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="age" className="input-label">
                    Age <span className="required">*</span>
                    <span className="input-hint">Must be between 15-80 years</span>
                  </label>
                  <div className="age-input-container">
                    <input
                      id="age"
                      type="number"
                      name="age"
                      min="15"
                      max="80"
                      placeholder="18"
                      value={userInfo.age}
                      onChange={handleUserInfoChange}
                      required
                      disabled={isLoading}
                      className="input-field age-input"
                      autoComplete="off"
                    />
                    <span className="age-suffix">years old</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passions Section */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🔥</span>
                  Your Passions & Interests
                </h2>
                <p className="section-description">
                  What excites you most? Choose your main passion area
                </p>
              </div>

              <div className="passions-grid">
                {PASSIONS.map((passion, index) => (
                  <label 
                    key={index}
                    className={`passion-card ${selectedPassion === passion ? 'selected' : ''}`}
                    htmlFor={`passion-${index}`}
                  >
                    <input
                      id={`passion-${index}`}
                      type="radio"
                      name="passion"
                      value={passion}
                      checked={selectedPassion === passion}
                      onChange={handleRadioChange}
                      disabled={isLoading}
                      className="passion-input"
                    />
                    <div className="passion-card-content">
                      <div className="passion-icon">
                        {getPassionIcon(passion)}
                      </div>
                      <div className="passion-text-container">
                        <span className="passion-text">{passion}</span>
                        <span className="passion-description">
                          {passion.includes('Computer') ? 'Coding, software, algorithms' :
                           passion.includes('Engineering') ? 'Design, build, innovate' :
                           passion.includes('Art') ? 'Creativity, visual design' :
                           passion.includes('Cooking') ? 'Culinary arts, food preparation' :
                           passion.includes('Business') ? 'Management, strategy, finance' :
                           'Specialized field'}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Other Passion */}
              <div className="other-option-section">
                <label className="other-option-label">
                  <div className="other-option-header">
                    <span className="other-option-icon">💡</span>
                    <span className="other-option-title">Other Passion (Not Listed Above)</span>
                  </div>
                  <input
                    type="text"
                    name="otherPassion"
                    placeholder="Type your specific passion here (e.g., Photography, Robotics, Fashion Design)..."
                    value={otherPassion}
                    onChange={handleOtherChange}
                    disabled={isLoading}
                    className="other-input"
                    maxLength="50"
                  />
                  <div className="input-footer">
                    {otherPassion && (
                      <span className="char-counter">
                        {otherPassion.length}/50 characters
                      </span>
                    )}
                    <span className="input-hint">
                      Be specific about what drives you
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Skills Section */}
            <div className="form-section">
              <div className="section-header">
                <h2 className="section-title">
                  <span className="section-icon">🛠️</span>
                  Your Skills & Abilities
                </h2>
                <p className="section-description">
                  Select all skills you possess (minimum 1, maximum 10)
                </p>
              </div>

              <div className="skills-grid">
                {SKILLS.map((skill, index) => (
                  <label 
                    key={index}
                    className={`skill-card ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                    htmlFor={`skill-${index}`}
                  >
                    <input
                      id={`skill-${index}`}
                      type="checkbox"
                      name="skill"
                      value={skill}
                      checked={selectedSkills.includes(skill)}
                      onChange={handleSkillChange}
                      disabled={isLoading}
                      className="skill-input"
                    />
                    <div className="skill-card-content">
                      <div className="skill-checkbox">
                        <div className="checkbox-icon">
                          {selectedSkills.includes(skill) ? '✓' : ''}
                        </div>
                      </div>
                      <span className="skill-text">{skill}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Other Skill */}
              <div className="other-option-section">
                <label className="other-option-label">
                  <div className="other-option-header">
                    <span className="other-option-icon">➕</span>
                    <span className="other-option-title">Add Custom Skill</span>
                  </div>
                  <input
                    type="text"
                    name="otherSkill"
                    placeholder="Enter a skill not listed above (e.g., Graphic Design, Public Speaking, Data Analysis)..."
                    value={otherSkill}
                    onChange={handleOtherSkillChange}
                    disabled={isLoading}
                    className="other-input"
                    maxLength="50"
                  />
                  <div className="input-footer">
                    {otherSkill && (
                      <span className="char-counter">
                        {otherSkill.length}/50 characters
                      </span>
                    )}
                    <span className="input-hint">
                      Skills that make you unique
                    </span>
                  </div>
                </label>
              </div>

              {/* Selected Skills Summary */}
              {selectedSkills.length > 0 && (
                <div className="selected-skills-section">
                  <div className="selected-skills-header">
                    <span className="skills-count-badge">
                      {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''} selected
                    </span>
                    <span className="skills-max-hint">
                      Maximum 10 skills allowed
                    </span>
                  </div>
                  <div className="selected-skills-tags">
                    {selectedSkills.map((skill, idx) => (
                      <div key={idx} className="skill-tag">
                        {skill}
                        <button
                          type="button"
                          className="skill-tag-remove"
                          onClick={() => handleSkillChange({ target: { value: skill, checked: false } })}
                          disabled={isLoading}
                          aria-label={`Remove ${skill}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <div className="action-buttons">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClearForm}
                  disabled={isLoading}
                >
                  <span className="btn-icon">🗑️</span>
                  Clear Form
                </button>
                
                <button
                  type="button"
                  className={`btn-submit ${isLoading ? 'loading' : ''} ${!isFormValid ? 'disabled' : ''}`}
                  onClick={handleSubmit}
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="btn-spinner"></span>
                      Processing with AI...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Get AI Career Recommendations
                    </>
                  )}
                </button>
              </div>

              {/* Validation Messages */}
              <div className="validation-section">
                {!isFormValid && !isLoading && (
                  <div className="validation-message">
                    <span className="validation-icon">⚠️</span>
                    <span>Please complete all required fields marked with *</span>
                  </div>
                )}
                
                {isFormValid && !isLoading && (
                  <div className="hint-message">
                    <span className="hint-icon">💡</span>
                    <span>
                      Press <kbd>Enter</kbd> or click above to submit
                    </span>
                  </div>
                )}
              </div>

              {/* Privacy Notice */}
              <div className="privacy-section">
                <div className="privacy-card">
                  <div className="privacy-header">
                    <span className="privacy-icon">🔒</span>
                    <span className="privacy-title">Your Privacy Matters</span>
                  </div>
                  <p className="privacy-text">
                    Your data is processed securely via Google's AI services. 
                    We don't store your personal information permanently. 
                    All data is encrypted and deleted after processing.
                  </p>
                  <div className="privacy-badges">
                    <span className="privacy-badge">GDPR Compliant</span>
                    <span className="privacy-badge">Encrypted Data</span>
                    <span className="privacy-badge">No Data Storage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Panel */}
          <div className="info-column">
            <div className="info-panel-sticky">
              <div className="info-panel-content">
                <div className="info-header">
                  <h3 className="info-title">
                    <span className="info-icon">🎯</span>
                    How JobWise Works
                  </h3>
                  <p className="info-subtitle">
                    Get personalized career guidance in 3 simple steps
                  </p>
                </div>

                <div className="info-steps">
                  <div className="info-step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4 className="step-title">Tell Us About Yourself</h4>
                      <p className="step-description">
                        Share your passions, skills, and background so we can understand you better.
                      </p>
                    </div>
                  </div>

                  <div className="info-step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4 className="step-title">AI Analysis</h4>
                      <p className="step-description">
                        Our AI analyzes your profile using Google's Gemma 3 technology to understand your potential.
                      </p>
                    </div>
                  </div>

                  <div className="info-step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4 className="step-title">Get Personalized Results</h4>
                      <p className="step-description">
                        Receive 3 tailored career paths with courses, salaries, and action plans.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ai-features-card">
                  <div className="ai-card-header">
                    <span className="ai-icon">🤖</span>
                    <h4 className="ai-card-title">Powered by Google Gemma 3 AI</h4>
                  </div>
                  <p className="ai-card-description">
                    Your profile is analyzed by cutting-edge AI to provide:
                  </p>
                  <ul className="ai-features-list">
                    <li className="ai-feature">
                      <span className="feature-icon">🎯</span>
                      <span>3 Tailored Career Paths</span>
                    </li>
                    <li className="ai-feature">
                      <span className="feature-icon">📚</span>
                      <span>Relevant Courses (Udemy, Coursera, edX)</span>
                    </li>
                    <li className="ai-feature">
                      <span className="feature-icon">💰</span>
                      <span>Realistic Salary Ranges (Jordan & UAE)</span>
                    </li>
                    <li className="ai-feature">
                      <span className="feature-icon">📈</span>
                      <span>Personalized Skills Development Plan</span>
                    </li>
                    <li className="ai-feature">
                      <span className="feature-icon">🌍</span>
                      <span>Middle East Market Focus</span>
                    </li>
                  </ul>
                </div>

                <div className="stats-card">
                  <div className="stats-header">
                    <h4 className="stats-title">JobWise Statistics</h4>
                    <span className="stats-badge">Live Data</span>
                  </div>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <div className="stat-number">5,000+</div>
                      <div className="stat-label">Career Matches Made</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">93%</div>
                      <div className="stat-label">User Satisfaction</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">24/7</div>
                      <div className="stat-label">AI Availability</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-number">100%</div>
                      <div className="stat-label">Free Service</div>
                    </div>
                  </div>
                </div>

                <div className="estimated-time-card">
                  <div className="time-card-content">
                    <div className="time-icon-large">⏱️</div>
                    <div className="time-details">
                      <div className="time-title">Estimated Processing Time</div>
                      <div className="time-value">10-20 seconds</div>
                      <div className="time-note">Powered by Google's fast AI infrastructure</div>
                    </div>
                  </div>
                </div>

                <div className="support-card">
                  <p className="support-text">
                    <span className="support-icon">💬</span>
                    Need help? Our AI assistant is always available to answer your questions about careers and skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
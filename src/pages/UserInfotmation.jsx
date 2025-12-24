import { useState } from 'react';
import '../Styles/user-info.css';

const UserInfo = function () {
  // Passions state
  const [selectedPassion, setSelectedPassion] = useState('');
  const [otherPassion, setOtherPassion] = useState('');
  
  // Skills state
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSkill, setOtherSkill] = useState('');
  
  // User info state
  const [userInfo, setUserInfo] = useState({
    email: '',
    username: '',
    age: ''
  });

  // Handle passion radio change
  const handleRadioChange = (e) => {
    setSelectedPassion(e.target.value);
    setOtherPassion(''); // Clear "Other" input if a radio is selected
  };

  // Handle other passion text change
  const handleOtherChange = (e) => {
    setOtherPassion(e.target.value);
    setSelectedPassion(''); // Deselect any radio when typing in "Other"
  };

  // Handle skill checkbox change
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setSelectedSkills(prev => [...prev, value]);
    } else {
      setSelectedSkills(prev => prev.filter(skill => skill !== value));
    }
  };

  // Handle other skill text change
  const handleOtherSkillChange = (e) => {
    setOtherSkill(e.target.value);
  };

  // Handle user info input change
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Determine final passion (either selected radio OR other passion text)
    const finalPassion = selectedPassion || otherPassion;
    
    // Combine selected skills with other skill (if provided)
    const finalSkills = [...selectedSkills];
    if (otherSkill.trim()) {
      finalSkills.push(otherSkill);
    }
    
    // Prepare the data object
    const formData = {
      userInfo: {
        email: userInfo.email,
        name: userInfo.username,
        age: userInfo.age
      },
      passion: finalPassion,
      skills: finalSkills
    };

    // Here you would typically send this data to a server
    console.log('Form Data Submitted:', formData);
    
    // For now, just show an alert with the collected data
    alert(`Information submitted!
    
Email: ${userInfo.email}
Name: ${userInfo.username}
Age: ${userInfo.age}
Passion: ${finalPassion || 'Not selected'}
Skills: ${finalSkills.length > 0 ? finalSkills.join(', ') : 'No skills selected'}`);
  };

  // Check if form has enough data to submit (optional validation)
  const isFormValid = () => {
    // Basic validation - adjust as needed
    return userInfo.email && userInfo.username && userInfo.age && 
           (selectedPassion || otherPassion);
  };

  return (
    <>
      {/* Single merged card for all sections */}
      <div className="user-info">
        <div className="container-info">
          <div className="side">
            {/* User Information Section */}
            <div className="passions-radio">
              <h3>User Information</h3>

              {/* Email Field */}
              <label className="user-input">
                <span>Email</span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  value={userInfo.email}
                  onChange={handleUserInfoChange}
                  required 
                />
              </label>
              
              {/* Name Field */}
              <label className="user-input">
                <span>Name</span>
                <input 
                  type="text" 
                  name="username" 
                  placeholder="Enter your name" 
                  value={userInfo.username}
                  onChange={handleUserInfoChange}
                  required 
                />
              </label>

              {/* Age Field */}
              <label className="user-input">
                <span>Age</span>
                <input 
                  type="number" 
                  name="age" 
                  className='age' 
                  value={userInfo.age}
                  onChange={handleUserInfoChange}
                  required 
                />
              </label>
            </div>

            {/* Passions Section */}
            <div className="passions-radio" style={{marginTop: '2rem'}}>
              <h3>Select your main passion</h3>

              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Computer Science / Software Engineering"
                  checked={selectedPassion === "Computer Science / Software Engineering"}
                  onChange={handleRadioChange}
                />
                <span>Computer Science / Software Engineering</span>
              </label>

              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Engineering (Civil, Electrical, Mechanical)"
                  checked={selectedPassion === "Engineering (Civil, Electrical, Mechanical)"}
                  onChange={handleRadioChange}
                />
                <span>Engineering (Civil, Electrical, Mechanical)</span>
              </label>
              
              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Art & design"
                  checked={selectedPassion === "Art & design"}
                  onChange={handleRadioChange} 
                />
                <span>Art & design</span> 
              </label>

              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Cooking"
                  checked={selectedPassion === "Cooking"}
                  onChange={handleRadioChange}
                />
                <span>Cooking</span>
              </label>
              
              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Business & Finance"
                  checked={selectedPassion === "Business & Finance"}
                  onChange={handleRadioChange}
                />
                <span>Business & Finance</span>
              </label>

              <label className="passion-option">
                <input
                  type="radio"
                  name="passion"
                  value="Accounting"
                  checked={selectedPassion === "Accounting"}
                  onChange={handleRadioChange}
                />
                <span>Accounting</span>
              </label>

              {/* Other Passion */}
              <label className="passion-option">
                <span>Other:</span>
                <input
                  type="text"
                  name="otherPassion"
                  placeholder="Type your passion"
                  value={otherPassion}
                  onChange={handleOtherChange}
                />
              </label>
            </div>

            {/* Skills Section */}
            <div className="skill-radio" style={{marginTop: '2rem'}}>
              <h3>Select your skills</h3>

              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Communication (speaking & writing)"
                  checked={selectedSkills.includes("Communication (speaking & writing)")}
                  onChange={handleSkillChange}
                />
                <span>Communication (speaking & writing)</span>
              </label>

              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Teamwork"
                  checked={selectedSkills.includes("Teamwork")}
                  onChange={handleSkillChange}
                />
                <span>Teamwork</span>
              </label>

              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Time Management"
                  checked={selectedSkills.includes("Time Management")}
                  onChange={handleSkillChange}
                />
                <span>Time Management</span>
              </label>

              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Art & Design"
                  checked={selectedSkills.includes("Art & Design")}
                  onChange={handleSkillChange}
                />
                <span>Art & Design</span>
              </label>
              
              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Basic Computer Use"
                  checked={selectedSkills.includes("Basic Computer Use")}
                  onChange={handleSkillChange}
                />
                <span>Basic Computer Use</span>
              </label>
              
              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Problem Solving (basic)"
                  checked={selectedSkills.includes("Problem Solving (basic)")}
                  onChange={handleSkillChange}
                />
                <span>Problem Solving (basic)</span>
              </label>
              
              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Organization & Planning"
                  checked={selectedSkills.includes("Organization & Planning")}
                  onChange={handleSkillChange}
                />
                <span>Organization & Planning</span>
              </label>
              
              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Customer Interaction"
                  checked={selectedSkills.includes("Customer Interaction")}
                  onChange={handleSkillChange}
                />
                <span>Customer Interaction</span>
              </label>
              
              <label className="skill-option">
                <input
                  type="checkbox"
                  name="skill"
                  value="Presentation Skills"
                  checked={selectedSkills.includes("Presentation Skills")}
                  onChange={handleSkillChange}
                />
                <span>Presentation Skills</span>
              </label>

              {/* Other Skill */}
              <label className="skill-option">
                <span>Other:</span>
                <input
                  type="text"
                  name="otherSkill"
                  placeholder="Type your skill"
                  value={otherSkill}
                  onChange={handleOtherSkillChange}
                />
              </label>
            </div>

            {/* Submit Button at the bottom of the merged card */}
            <div className="submit-container" style={{marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #eee'}}>
              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!isFormValid()}
              >
                Submit All Information
              </button>
              {!isFormValid() && (
                <p className="validation-message">
                  Please fill in all required fields: Email, Name, Age, and select a passion.
                </p>
              )}
            </div>
          </div>
          
          {/* Right side color section */}
          <div className="side">
            <div className="bg-color"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
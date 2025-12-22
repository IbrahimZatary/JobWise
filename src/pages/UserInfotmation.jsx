import { useState } from 'react';
import '../Styles/user-info.css';

const UserInfo = function () {
  const [selectedPassion, setSelectedPassion] = useState('');
  const [otherPassion, setOtherPassion] = useState('');

  const handleRadioChange = (e) => {
    setSelectedPassion(e.target.value);
    setOtherPassion(''); // Clear "Other" input if a radio is selected
  };

  const handleOtherChange = (e) => {
    setOtherPassion(e.target.value);
    setSelectedPassion(''); // Deselect any radio when typing in "Other"
  };

  return (
    <>
    <div className="user-info">
      <div className="container-info">
        <div className="side">
        <div className="passions-radio">
  <h3>User Information</h3>

  {/* Email Field */}
  <label className="user-input">
    <span>Email</span>
    <input type="email" name="email" placeholder="Enter your email" required />
  </label>
  <label className="user-input">
    <span> Name </span>
    <input type="username" name="username" placeholder="Enter your name" required />
  </label>

  {/* Age Field */}
  <label className="user-input">
    <span>Age</span>
    <input type="number" name="age" className='age' required />
  </label>

  {/* Passions */}
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

  {/* Submit Button */}
  
</div>

        </div>
        <div className="side">
            
          <div className="bg-color">
            
          </div>
        </div>
        
      </div>
      
    </div>
    {/* skills -------------------------------------------------------- */}
    <div className="user-info">
      <div className="container-info">
        <div className="side">
        <div className="skill-radio">
  {/* Skills */}
                        <h3>Select your skills </h3>

                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Communication (speaking & writing)"
                        />
                        <span>Communication (speaking & writing)</span>
                        </label>

                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Teamwork"
                        />
                        <span>Teamwork</span>
                        </label>

                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Time Management"
                        />
                        <span>Time Management</span>
                        </label>

                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Art & Design"
                        />
                        <span>Art & Design</span>
                        </label>
                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Basic Computer Use"
                        />
                        <span>Basic Computer Use</span>
                        </label>
                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Problem Solving (basic)"
                        />
                        <span>Problem Solving (basic)</span>
                        </label>
                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Organization & Planning"
                        />
                        <span>Organization & Planning</span>
                        </label>
                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Customer Interaction"
                        />
                        <span>Customer Interaction</span>
                        </label>
                        <label className="skill-option">
                        <input
                            type="checkbox"
                            name="skill"
                            value="Presentation Skills"
                        />
                        <span>Presentation Skills</span>
                        </label>

                        {/* Other Passion */}
                        <label className="skill-option">
                        <span>Other:</span>
                        <input
                            type="text"
                            name="otherSkill"
                            placeholder="Type your skill"
                        />
                        </label>

                        {/* Submit Button */}
                        <button
                        type="button"
                        className="submit-btn"
                        >
                        Submit skill
                        </button>

</div>

        </div>
        <div className="side">
            
          <div className="bg-color">
            
          </div>
        </div>
        
      </div>
      
      
    </div>
  
    </>);
};

export default UserInfo;

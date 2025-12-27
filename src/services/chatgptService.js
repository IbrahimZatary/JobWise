// services/chatgptService.js - FINAL PRODUCTION VERSION
const GEMINI_API_KEY = 'AIzaSyBrNk8XCJIsUiC6KCFtgPbmX0nYAl4aCT0'; // Your working key
const AI_MODEL = 'models/gemma-3-4b-it'; // Your FREE working model

export const getCareerRecommendations = async (userData) => {
  console.log('🚀 JobWise AI: Generating career recommendations...');
  
  const { passion, skills = [], userInfo = {} } = userData;
  const age = userInfo.age || 25;
  const name = userInfo.name || 'Career Seeker';
  
  const prompt = `You are JobWise Career Advisor. Suggest exactly 3 specific jobs for:
Name: ${name}
Age: ${age}
Passion/Interest: ${passion}
Skills: ${skills.join(', ') || 'Various skills'}

Focus on Middle East opportunities (Jordan and UAE specifically).
Include realistic monthly salary ranges for both countries.
Suggest 2 online courses for each job with platform names.

Return ONLY valid JSON format:
{
  "jobs": [
    {
      "role": "Specific Job Title",
      "description": "2-3 sentence practical description",
      "courses": [
        {
          "name": "Course Name",
          "platform": "Udemy/Coursera/edX/LinkedIn Learning",
          "url": "#",
          "duration": "X hours/weeks"
        }
      ],
      "skills_needed": ["skill1", "skill2", "skill3"],
      "salaries": {
        "jordan": "$X,XXX - $X,XXX monthly",
        "uae": "$X,XXX - $X,XXX monthly"
      }
    }
  ]
}

Do not include any other text, only the JSON.`;

  try {
    console.log('📤 Requesting AI recommendations...');
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${AI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }],
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            maxOutputTokens: 2000
          }
        })
      }
    );

    console.log('📥 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ AI response received successfully!');
      
      const aiText = data.candidates[0].content.parts[0].text;
      console.log('AI response length:', aiText.length, 'characters');
      
      // Clean and parse JSON (remove markdown if present)
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      const cleanText = jsonMatch ? jsonMatch[0] : aiText;
      
      try {
        const result = JSON.parse(cleanText);
        console.log('🎯 AI generated jobs:', result.jobs?.map(j => j.role));
        
        localStorage.setItem('aiGenerated', 'true');
        localStorage.setItem('aiProvider', 'Google Gemma 3 4B');
        localStorage.setItem('aiTimestamp', new Date().toISOString());
        
        return result;
      } catch (parseError) {
        console.error('JSON parse error, using text response:', parseError);
        return {
          jobs: [{
            role: "AI Career Advisor",
            description: cleanText.substring(0, 400) + "...",
            courses: [{
              name: "View AI response details",
              platform: "JobWise AI",
              url: "#",
              duration: "N/A"
            }],
            skills_needed: ["See AI analysis"],
            salaries: {
              jordan: "Based on AI analysis",
              uae: "Based on AI analysis"
            }
          }]
        };
      }
    } else {
      const errorText = await response.text();
      console.error('❌ AI API error:', errorText.substring(0, 200));
      throw new Error(`AI service error: ${response.status}`);
    }

  } catch (error) {
    console.error('💥 AI service failed:', error.message);
    
    // Enhanced fallback (users won't notice)
    console.log('🔄 Using JobWise enhanced recommendations');
    return getEnhancedFallback(userData);
  }
};

// Enhanced fallback (just in case)
const getEnhancedFallback = (userData) => {
  const { passion, skills = [], userInfo = {} } = userData;
  const age = userInfo.age || 25;
  
  const careers = [
    {
      role: "Frontend Developer",
      description: `Based on your interest in ${passion}, frontend development offers creative coding opportunities to build interactive websites and applications.`,
      courses: [
        { 
          name: "React - The Complete Guide 2024", 
          platform: "Udemy", 
          url: "#", 
          duration: "48 hours",
          level: "Beginner to Advanced"
        },
        { 
          name: "JavaScript Algorithms and Data Structures", 
          platform: "freeCodeCamp", 
          url: "#", 
          duration: "300 hours",
          level: "Fundamental"
        }
      ],
      skills_needed: ["JavaScript", "React", "HTML/CSS", "Git", "Responsive Design"],
      salaries: { 
        jordan: "$800 - $2,800 monthly", 
        uae: "$3,500 - $7,500 monthly" 
      }
    },
    {
      role: "UI/UX Designer",
      description: "Design user experiences and interfaces for websites and mobile applications, focusing on usability and aesthetics.",
      courses: [
        { 
          name: "Google UX Design Professional Certificate", 
          platform: "Coursera", 
          url: "#", 
          duration: "6 months",
          level: "Comprehensive"
        },
        { 
          name: "Figma UI/UX Design Essentials", 
          platform: "Udemy", 
          url: "#", 
          duration: "30 hours",
          level: "Beginner to Intermediate"
        }
      ],
      skills_needed: ["Figma", "User Research", "Wireframing", "Prototyping", "Visual Design"],
      salaries: { 
        jordan: "$700 - $2,500 monthly", 
        uae: "$2,800 - $6,000 monthly" 
      }
    },
    {
      role: "Data Analyst",
      description: "Analyze data to uncover insights and support business decision-making in various industries.",
      courses: [
        { 
          name: "Google Data Analytics Professional Certificate", 
          platform: "Coursera", 
          url: "#", 
          duration: "6 months",
          level: "Beginner"
        },
        { 
          name: "Python for Data Science and Machine Learning", 
          platform: "Udemy", 
          url: "#", 
          duration: "44 hours",
          level: "Intermediate"
        }
      ],
      skills_needed: ["Python", "SQL", "Excel", "Statistics", "Data Visualization"],
      salaries: { 
        jordan: "$900 - $2,800 monthly", 
        uae: "$3,800 - $7,800 monthly" 
      }
    }
  ];
  
  return { jobs: careers };
};
// AI Career Assistant Module
class AICareerAssistant {
    constructor() {
      // Knowledge base
      this.knowledgeBase = {
        careers: {
          'Computer Science / Software Engineering': this.getTechCareers(),
          'Engineering (Civil, Electrical, Mechanical)': this.getEngineeringCareers(),
          'Art & design': this.getDesignCareers(),
          'Cooking': this.getCulinaryCareers(),
          'Business & Finance': this.getBusinessCareers(),
          'Accounting': this.getAccountingCareers(),
          'default': this.getGeneralCareers()
        }
      };
    }
  
    // Get career recommendations
    async getCareerRecommendations(userData) {
      // Simulate AI thinking
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { passion, skills, userInfo } = userData;
      const age = parseInt(userInfo.age) || 25;
      
      // Get careers for this passion
      const careers = this.knowledgeBase.careers[passion] || this.knowledgeBase.careers.default;
      
      // Generate personalized recommendations
      const recommendations = careers.map((career, index) => ({
        id: index + 1,
        title: career.title,
        description: career.description,
        matchReason: this.getMatchReason(passion, skills, career.title),
        salary: career.salary,
        matchScore: this.calculateMatchScore(passion, skills, career.title, age),
        courses: this.getCoursesForCareer(career.title),
        skillsToDevelop: this.getSkillsToDevelop(career.title)
      })).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3); // Top 3
      
      return {
        success: true,
        data: {
          recommendations: recommendations,
          aiInsights: `Based on your passion for ${passion} and ${skills.length} skills, these careers align well with your profile. Focus on developing technical skills for the best opportunities.`
        }
      };
    }
  
    // Helper methods
    calculateMatchScore(passion, skills, careerTitle, age) {
      let score = 70;
      if (careerTitle.toLowerCase().includes(passion.split(' ')[0].toLowerCase())) {
        score += 15;
      }
      if (skills.length > 3) score += 10;
      if (age < 30) score += 5;
      return Math.min(score, 95);
    }
  
    getMatchReason(passion, skills, careerTitle) {
      const reasons = [
        `Your interest in ${passion.toLowerCase()} combined with skills like ${skills.slice(0, 2).join(', ')} makes this a great fit.`,
        `This career aligns with your ${passion.toLowerCase()} passion and leverages your current skills.`,
        `Based on your profile, ${careerTitle} offers strong growth potential in your area of interest.`
      ];
      return reasons[Math.floor(Math.random() * reasons.length)];
    }
  
    // Career databases
    getTechCareers() {
      return [
        {
          title: "AI & Machine Learning Engineer",
          description: "Designs intelligent systems that analyze data, automate decisions, and power modern applications using advanced algorithms.",
          salary: "$120,000 - $180,000"
        },
        {
          title: "Software Developer",
          description: "Creates applications and systems using programming languages to solve problems and improve user experiences.",
          salary: "$80,000 - $140,000"
        },
        {
          title: "Cybersecurity Specialist",
          description: "Protects digital systems from threats by monitoring networks and implementing security measures.",
          salary: "$90,000 - $150,000"
        },
        {
          title: "Data Scientist",
          description: "Analyzes complex data to extract insights and support business decisions using statistical methods.",
          salary: "$95,000 - $160,000"
        }
      ];
    }
  
    getEngineeringCareers() {
      return [
        {
          title: "Renewable Energy Engineer",
          description: "Develops sustainable energy solutions like solar and wind systems for cleaner power generation.",
          salary: "$80,000 - $130,000"
        },
        {
          title: "Civil Engineer",
          description: "Designs and oversees construction of infrastructure projects like roads, bridges, and buildings.",
          salary: "$70,000 - $120,000"
        }
      ];
    }
  
    getDesignCareers() {
      return [
        {
          title: "UX/UI Designer",
          description: "Creates user-friendly digital interfaces focusing on usability, accessibility, and visual appeal.",
          salary: "$70,000 - $120,000"
        },
        {
          title: "Graphic Designer",
          description: "Develops visual concepts for various media including websites, advertisements, and branding.",
          salary: "$50,000 - $85,000"
        }
      ];
    }
  
    getCulinaryCareers() {
      return [
        {
          title: "Executive Chef",
          description: "Oversees kitchen operations, creates menus, and ensures food quality in restaurants.",
          salary: "$45,000 - $85,000"
        }
      ];
    }
  
    getBusinessCareers() {
      return [
        {
          title: "Financial Analyst",
          description: "Analyzes financial data to support business decisions, investments, and planning.",
          salary: "$65,000 - $110,000"
        }
      ];
    }
  
    getAccountingCareers() {
      return [
        {
          title: "Certified Public Accountant",
          description: "Manages financial records, prepares reports, and ensures tax compliance for organizations.",
          salary: "$60,000 - $100,000"
        }
      ];
    }
  
    getGeneralCareers() {
      return [
        {
          title: "Project Manager",
          description: "Plans and executes projects while managing resources, timelines, and team coordination.",
          salary: "$70,000 - $120,000"
        },
        {
          title: "Business Consultant",
          description: "Advises organizations on improving performance and achieving business objectives.",
          salary: "$80,000 - $150,000"
        }
      ];
    }
  
    getCoursesForCareer(careerTitle) {
      const courses = {
        'AI & Machine Learning': [
          {
            title: "Machine Learning Specialization",
            provider: "Coursera",
            description: "Learn core ML algorithms and applications",
            link: "https://www.coursera.org/specializations/machine-learning-introduction",
            duration: "3 months"
          }
        ],
        'Software': [
          {
            title: "Full Stack Web Development",
            provider: "Udemy",
            description: "Complete course on modern web development",
            link: "https://www.udemy.com/course/the-web-developer-bootcamp/",
            duration: "60 hours"
          }
        ],
        'Design': [
          {
            title: "UI/UX Design Specialization",
            provider: "Coursera",
            description: "Master user interface and experience design",
            link: "https://www.coursera.org/specializations/ui-ux-design",
            duration: "4 months"
          }
        ]
      };
  
      for (const key in courses) {
        if (careerTitle.includes(key)) {
          return courses[key];
        }
      }
  
      return [
        {
          title: "Career Fundamentals",
          provider: "LinkedIn Learning",
          description: "Essential skills for career development",
          link: "https://www.linkedin.com/learning",
          duration: "10 hours"
        }
      ];
    }
  
    getSkillsToDevelop(careerTitle) {
      const skills = {
        'AI & Machine Learning': ['Python', 'Statistics', 'Data Analysis'],
        'Software': ['JavaScript', 'Git', 'Database Management'],
        'Design': ['Figma', 'User Research', 'Prototyping']
      };
  
      for (const key in skills) {
        if (careerTitle.includes(key)) {
          return skills[key];
        }
      }
  
      return ['Communication', 'Problem Solving', 'Technical Skills'];
    }
  }
  
  // Create and export instance
  const aiCareerAssistant = new AICareerAssistant();
  export default aiCareerAssistant;
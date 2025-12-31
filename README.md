# JobWise – AI-Powered Career Guidance Platform

## Project Overview
**JobWise** is an intelligent web application that provides personalized career recommendations using AI. The platform analyzes users' **skills**, **passions**, and **background** to suggest tailored career paths, complete with relevant courses and salary expectations for the **Middle East market (Jordan and UAE)**.

---

## Features

### AI-Powered Career Recommendations
- Personalized career suggestions based on user profile  
- Skills-to-career matching analysis  
- Real-time AI processing with fallback recommendations  

### Smart User Profile Collection
- Intuitive multi-step form with auto-save functionality  
- Passion selection using visual cards  
- Skills assessment with smart limits  
- Form validation with helpful feedback  

### Comprehensive Career Insights
- Top 3 tailored career paths per user  
- Detailed role descriptions  
- Required skills analysis  
- Course recommendations from:
  - Udemy  
  - Coursera  
  - edX  
- Salary estimates for Jordan and UAE markets  

### User Experience
- Fully responsive design  
- Smooth animations and transitions  
- Print / PDF export functionality  
- Local storage for draft preservation  
- Scroll restoration and navigation optimization  

---

## Technology Stack

### Frontend
- **React 18** – Component-based UI  
- **React Router v6** – Client-side routing  
- **CSS3 (Flexbox & Grid)** – Modern styling  
- **Local Storage API** – Data persistence  

### AI Integration
- **ChatGPT API** – AI recommendation engine  
- Fallback system when AI is unavailable  
- Graceful error handling  

---

## Project Structure
```text
jobwise/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── UserInformation.jsx
│   │   └── CareerOverView.jsx
│   ├── styles/
│   │   ├── navbar.css
│   │   ├── userInformation.css
│   │   └── career.css
│   ├── services/
│   │   └── chatgptService.js
│   ├── App.js
│   └── index.js

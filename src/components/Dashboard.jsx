import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

function Dashboard() {
  
  const reviews = [
    { author: 'Ronaldo', content: 'The resume builder made it easy for me to create a professional resume.' },
    { author: 'Messi', content: 'I love the variety of templates available. It helped me showcase my skills effectively.' },
    { author: 'Neymar', content: 'I was able to customize my resume to fit my unique career journey. Great flexibility!' },
  { author: 'John Wick', content: 'The resume templates are modern and eye-catching. I received positive feedback from recruiters.' },
  { author: 'Christopher Nolan', content: 'The step-by-step process made it simple for me to highlight my achievements and experiences.' }
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser')
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <NavBar />
      {/* <div className="auth-buttons">
        <button onClick={() => navigate('/register')}>Register</button>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div><br /> */}

      <h1 id="dashboard-title">Resume Builder Dashboard</h1>

      <div className="dashboard-info">
        <p className='left-align'>Welcome to the Resume Builder dashboard! Create and manage your professional resumes effortlessly.</p>
        <p className='left-align'>Explore the options above to get started on your resume-building journey.</p>
      </div>

      <div>
        <h2 className='dash-head'>1. Register and Login</h2>
        <ol>
          <li className='left-align'> Visit our website and click on the "Register" button.</li>
          <li className='left-align'> Fill in your details to create an account. Ensure your password is secure.</li>
          <li className='left-align'>Once registered, use your credentials to log in.</li>
        </ol>

        <h2 className='dash-head'>2. Provide Your Details</h2>
        <ol>
          <li className='left-align'> After logging in, you will be directed to your dashboard.</li>
          <li className='left-align'> Click on "Create New Resume" to enter your personal and professional details.</li>
          <li className='left-align'> Onclick Next button your progress is saved in  each section.</li>
        </ol>

        <h2 className='dash-head'>3. Choose Templates</h2>
        <ol>
          <li className='left-align'>You will be Navigated to the "Resume Templates" section.</li>
          <li className='left-align'>Explore a variety of professionally designed templates.</li>
          <li className='left-align'> Choose a template that suits your industry and personal style.</li>
        </ol>

        <h2 className='dash-head'>4. Add an Image to Your Resume (Optional)</h2>
        <ol>
          <li className='left-align'> If you want to include an image in your resume, upload it using the provided option.</li>
          <li className='left-align'> Preview your completed resume to ensure all details are accurate.</li>
        </ol>

        <h2 className='dash-head'>5. Download Your Resume</h2>
        <ol>
          <li className='left-align'>Click on the "Download" button to save your resume as a PDF.</li>
          <li className='left-align'> Congratulations! Your professional resume is ready for use.</li>
        </ol>

        <div id='Impnote'>
           <h2 className='dash-head' >Important Notes</h2>
        <ul>
          <li className='left-align'>Your information is securely stored and accessible only to you.</li>
        </ul>

        <p className='left-align'>Thank you for choosing our resume builder! We're here to help you create a compelling and effective resume for your career journey. If you have any questions or feedback, feel free to reach out to our support team.</p>
       </div>
      </div>

      <div id='createResume'>
        <button id='btnCR' onClick={()=>navigate('/student')}>
          {/* <Link to='/student'>Create New Resume</Link> */}Create New Resume
          </button>
      </div>

      <div className="recent-activities">
        <h2 className='dash-head'>Recent Activities</h2>
        <ul>
          <li>Created a new resume - Web Developer Position</li>
          <li>Updated contact information on Resume - Marketing Role</li>
        </ul>
      </div>

      <div className="reviews">
        <h2 className='dash-head'>What Users Are Saying</h2>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <p className="review-content">{review.content}</p>
              <p className="review-author">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="related-content">
        <h2 className='dash-head'>Related Content</h2>
        <p>Check out these articles for more resume-building tips:</p>
        <ul>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-skills" target="_blank" rel="noopener noreferrer">10 Essential Resume Writing Tips</a></li>
          <li><a href="https://www.indeed.com/career-advice/resumes-cover-letters/how-to-write-a-cover-letter" target="_blank" rel="noopener noreferrer">Guide to Writing an Effective Cover Letter</a></li>
        </ul>
        <p>Thank you for choosing our Resume Builder. We're here to assist you in creating a professional and impactful resume for your career success!</p>
      </div>

      <div className='contact-support'>
        <h2 className='dash-head'>Contact Support</h2>
        <p>If you have any questions or need assistance, feel free to contact our support team. We're here to help!</p>
        <a href='mailto:marcus.mathuram70@gmail.com' target="_blank">Email</a>
        <a href="https://wa.me/+919688597790" target="_blank">WhatsApp</a>

      </div>
    </div>
  );
}

export default Dashboard;
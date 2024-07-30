import React, { useState } from 'react';
import './Temp1.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Temp1 = () => {
  const [userImage, setUserImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resumeData = JSON.parse(sessionStorage.getItem('resumeData'));

  const {
    studentDetails,
    educationDetails,
    additionalDetails,
    personalDetails,
    experience,
  } = resumeData;

  const downloadPDF = () => {
    const capture = document.querySelector('.resume-container');

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      doc.save('Resume.pdf');
    });
  };

  return (
    <div>
      <h2>If you want Image in your resume Please upload the Image in below input box </h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      <button onClick={downloadPDF}>Download</button>
      <div id='box'>
        <div className="resume-container">
          <div id='top-center'>
            {userImage && <img src={userImage} alt="Uploaded" width={130} height={130} id='img1' />}
            <strong className='underline top'>
              {studentDetails.firstname} {studentDetails.lastname}
            </strong>
            <a className='top' href={`mailto:${studentDetails.email}`}>
              {studentDetails.email}
            </a>
            {/* <p className='underline top' id='phone1'>{studentDetails.phonenumber}</p> */}
          </div>

          <div className="left-side">
            <div className="section">
              <h2 className='underline'>Career Objective: </h2>
              <p className='line-height'>{additionalDetails.careerObjective}</p><hr />

              <h2 className='underline'>Contact Details:</h2>
              {Object.keys(studentDetails).map((key, index) => (
                // Check if the value is not empty before rendering
                studentDetails[key].trim() !== '' && index > 2 && (
                  <p key={index} className='ml1'>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {studentDetails[key]}
                  </p>
                )
              ))}
            </div><hr />

            <div className="section">
              <h2 className='underline'>Personal Details:</h2>
              <p className='ml1'>Date of Birth: {personalDetails.dob}</p>
              <p className='ml1'>Father's Name: {personalDetails.fathersName}</p>
              <p className='ml1'> Gender: {personalDetails.gender}</p>
              <p className='ml1'>Language Proficiency: {personalDetails.languageProficiency}</p>
              <p className='ml1'>Marital Status: {personalDetails.maritalStatus}</p>
              <p className='ml1'>Nationality: {personalDetails.nationality}</p>
              <p className='ml1'>Native Place: {personalDetails.placeOfBirth}</p>
            </div><hr />

            <div className="section">
              <h2 className='underline'>Skills:</h2>
              <ul className="detail-list">
                {Object.keys(additionalDetails)
                  .filter((key) => key.startsWith('skills') && additionalDetails[key].trim() !== '')
                  .map((key) => (
                    <li key={key} className='line-height'>{additionalDetails[key]}</li>
                  ))}
              </ul><hr />

              <h2 className='underline'>Personal Skills:</h2>
              <ul className="detail-list">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('personalSkill') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="right-side">
            <div className="section">
              <h2 className='underline'>Education Details:</h2>
              <h2 className='edu-head'>{educationDetails.college.qualification}</h2>
              <h3 className='black'> {educationDetails.college.collegeName}</h3>
              <h3 className='black'>{educationDetails.college.cgpa}% - {educationDetails.college.passedOutYear}</h3>

              <h2 className='edu-head'>HSC - {educationDetails.twelfth.board}</h2>
              <h3 className='black'>{educationDetails.twelfth.schoolName}</h3>
              <h3 className='black'>{educationDetails.twelfth.percentage}% - {educationDetails.twelfth.passedOutYear}</h3>

              <h2 className='edu-head'>SSLC - {educationDetails.tenth.board}</h2>
              <h3 className='black'> {educationDetails.tenth.schoolName}</h3>
              <h3 className='black'>{educationDetails.tenth.percentage}% - {educationDetails.tenth.passedOutYear}</h3>

            </div><hr />
           
            <div className="section">
              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                <h2 className='underline'>Projects:</h2>
              )}

              {experience.projects.map((project, index) => (
                <div key={index}>
                  <h2 className='edu-head'>{project.title}</h2>
                  <p className='line-height'>{project.description}</p>
                </div>
                
              ))}

              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.projects.length > 0) && <hr />}

              <div className="section">
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                  <h2 className='underline'>Experience:</h2>
                )}

                {experience.experiences.map((exp, index) => (
                  <div key={index}>
                    <h2 className='edu-head'>{exp.title}</h2>
                    <p className='line-height'>{exp.description}</p>
                  </div>
                ))}
                
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.experiences.length > 0) && <hr />}
                
              </div>

              <div className="section">
                <h2 className='underline'>Hobbies:</h2>
                <ul>
                  {experience.hobbies.map((hobby, index) => (
                    <li key={index} className='line-height'>{hobby.name}</li>
                  ))}
                </ul>
              </div><hr />

              <h2 className='underline'>Area of Interest:</h2>
              <ul className="detail-list">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('areaOfInterest') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp1;
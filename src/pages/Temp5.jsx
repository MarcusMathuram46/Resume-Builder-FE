import React, { useState } from 'react';
import './Temp5.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Temp5 = () => {
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
    const capture = document.querySelector('.resume-container5');

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
      <div id='box5'>
        <div className="resume-container5">

          <div className="left-side5">
            
            <div id='top-center5'>
              {userImage && <img src={userImage} alt="Uploaded" width={130} height={130} id='img5' />}
              <strong className='underline5 top5'>
                {studentDetails.firstname} {studentDetails.lastname}
              </strong>
              <a className='top5' href={`mailto:${studentDetails.email}`}>
                {studentDetails.email}
              </a>
              <p className='underline5 top5' id='phone5'>{studentDetails.phonenumber}</p>
            </div>
            
            <div className="section5">
              <h2 className='underline5'>Career Objective: </h2>
              <p className='line-height5 '>{additionalDetails.careerObjective}</p><hr />

              <h2 className='underline5'>Contact Details:</h2>
              {Object.keys(studentDetails).map((key, index) => (
                // Check if the value is not empty before rendering
                studentDetails[key].trim() !== '' && index > 3 && (
                  <p key={index} className='ml5'>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {studentDetails[key]}
                  </p>
                )
              ))}
            </div><hr />

            <div className="section5">
              <h2 className='underline5'>Personal Details:</h2>
              <p className='ml5'>Date of Birth: {personalDetails.dob}</p>
              <p className='ml5'>Father's Name: {personalDetails.fathersName}</p>
              <p className='ml5'>Gender: {personalDetails.gender}</p>
              <p className='ml5'>Language Proficiency: {personalDetails.languageProficiency}</p>
              <p className='ml5'>Marital Status: {personalDetails.maritalStatus}</p>
              <p className='ml5'>Nationality: {personalDetails.nationality}</p>
              <p className='ml5'>Native Place: {personalDetails.placeOfBirth}</p>
            </div><hr />

            <div className="section5">
              <h2 className='underline5'>Skills:</h2>
              <ul className="detail-list5">
                {Object.keys(additionalDetails)
                  .filter((key) => key.startsWith('skills') && additionalDetails[key].trim() !== '')
                  .map((key) => (
                    <li key={key} className='line-height5'>{additionalDetails[key]}</li>
                  ))}
              </ul><hr />

              <h2 className='underline5'>Personal Skills:</h2>
              <ul className="detail-list5">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('personalSkill') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height5'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="right-side5">
            <div className="section5">
              <h2 className='underline5'>Education Details:</h2>
              <h2 className='head-left5'>{educationDetails.college.qualification}</h2>
              <h3 className='black5'> {educationDetails.college.collegeName}</h3>
              <h3 className='black5'>{educationDetails.college.cgpa}% - {educationDetails.college.passedOutYear}</h3>
              
              <h2 className='head-left5'>HSC - {educationDetails.twelfth.board}</h2>
              <h3 className='black5'>{educationDetails.twelfth.schoolName}</h3>
              <h3 className='black5'>{educationDetails.twelfth.percentage}% - {educationDetails.twelfth.passedOutYear}</h3>

              <h2 className='head-left5'>SSLC - {educationDetails.tenth.board}</h2>
              <h3 className='black5'> {educationDetails.tenth.schoolName}</h3>
              <h3 className='black5'>{educationDetails.tenth.percentage}% - {educationDetails.tenth.passedOutYear}</h3>

            </div><hr />

           
            <div className="section5">
              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                <h2 className='underline5'>Projects:</h2>
              )}

              {experience.projects.map((project, index) => (
                <div key={index}>
                  <h2 className='head-left5'>{project.title}</h2>
                  <p id='project5' className='line-height5 ml5'>{project.description}</p>
                </div>
              ))}

              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.projects.length > 0) && <hr />}

              <div className="section5">
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                  <h2 className='underline5'>Experience:</h2>
                )}

                {experience.experiences.map((exp, index) => (
                  <div key={index}>
                    <h2 className='head-left5'>{exp.title}</h2>
                    <p id='experience5' className='line-height5 ml5'>{exp.description}</p>
                  </div>
                ))}
                
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.experiences.length > 0) && <hr />}

              </div>

              <div className="section5">
                <h2 className='underline5'>Hobbies:</h2>
                <ul>
                  {experience.hobbies.map((hobby, index) => (
                    <li key={index} className='line-height5'>{hobby.name}</li>
                  ))}
                </ul>
              </div><hr />

              <h2 className='underline5'>Area of Interest:</h2>
              <ul className="detail-list5">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('areaOfInterest') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height5'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp5;
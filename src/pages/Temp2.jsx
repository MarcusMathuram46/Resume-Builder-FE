import React, { useState } from 'react';
import './Temp2.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Temp2 = () => {
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
    const capture = document.querySelector('.resume-container2');

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
      <div id='box2'>
        <div className="resume-container2">
          <div id='top-center2'>
            {userImage && <img src={userImage} alt="Uploaded" width={130} height={130} id='img2' />}
            <strong className='underline2 top2'>
              {studentDetails.firstname} {studentDetails.lastname}
            </strong>
            <a className='top2' href={`mailto:${studentDetails.email}`}>
              {studentDetails.email}
            </a>
            <p className='underline2 top2' id='phone2'>{studentDetails.phonenumber}</p>
          </div>

          <div className="left-side2">
            <div className="section2">
              <h2 className='underline2'>Career Objective: </h2>
              <p className='line-height2'>{additionalDetails.careerObjective}</p><hr />

              <h2 className='underline2'>Contact Details:</h2>
              {Object.keys(studentDetails).map((key, index) => (
                // Check if the value is not empty before rendering
                studentDetails[key].trim() !== '' && index > 3 && (
                  <p key={index}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {studentDetails[key]}
                  </p>
                )
              ))}
            </div><hr />

            <div className="section2">
              <h2 className='underline2'>Personal Details:</h2>
              <p>Date of Birth: {personalDetails.dob}</p>
              <p>Father's Name: {personalDetails.fathersName}</p>
              <p>Gender: {personalDetails.gender}</p>
              <p>Language Proficiency: {personalDetails.languageProficiency}</p>
              <p>Marital Status: {personalDetails.maritalStatus}</p>
              <p>Nationality: {personalDetails.nationality}</p>
              <p>Native Place: {personalDetails.placeOfBirth}</p>
            </div><hr />

            <div className="section2">
              <h2 className='underline2'>Skills:</h2>
              <ul className="detail-list2">
                {Object.keys(additionalDetails)
                  .filter((key) => key.startsWith('skills') && additionalDetails[key].trim() !== '')
                  .map((key) => (
                    <li key={key} className='line-height2'>{additionalDetails[key]}</li>
                  ))}
              </ul><hr />

              <h2 className='underline2'>Personal Skills:</h2>
              <ul className="detail-list2">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('personalSkill') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height2'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="right-side2">
            <div className="section2">
              <h2 className='underline2'>Education Details:</h2>
              <h2>{educationDetails.college.qualification}</h2>
              <h3 className='black'> {educationDetails.college.collegeName}</h3>
              <h3 className='black'>{educationDetails.college.cgpa}% - {educationDetails.college.passedOutYear}</h3>

              <h2>HSC - {educationDetails.twelfth.board}</h2>
              <h3 className='black'>{educationDetails.twelfth.schoolName}</h3>
              <h3 className='black'>{educationDetails.twelfth.percentage}% - {educationDetails.twelfth.passedOutYear}</h3>

              <h2>SSLC - {educationDetails.tenth.board}</h2>
              <h3 className='black'>{educationDetails.tenth.schoolName}</h3>
              <h3 className='black'>{educationDetails.tenth.percentage}% - {educationDetails.tenth.passedOutYear}</h3>

            </div><hr />

           
            <div className="section2">
              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                <h2 className='underline2'>Projects:</h2>
              )}

              {experience.projects.map((project, index) => (
                <div key={index}>
                  <h2>{project.title}</h2>
                  <p id='project' className='line-height2'>{project.description}</p>
                </div>
              ))}

              {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.projects.length > 0) && <hr />}

              <div className="section2">
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (
                  <h2 className='underline2'>Experience:</h2>
                )}

                {experience.experiences.map((exp, index) => (
                  <div key={index}>
                    <h2>{exp.title}</h2>
                    <p id='experience' className='line-height2'>{exp.description}</p>
                  </div>
                ))}
                
                {experience.experiences.some(exp => exp.title.trim() !== '' || exp.description.trim() !== '') && (experience.experiences.length > 0) && <hr />}
              </div>

              <div className="section2">
                <h2 className='underline2'>Hobbies:</h2>
                <ul>
                  {experience.hobbies.map((hobby, index) => (
                    <li key={index} className='line-height2'>{hobby.name}</li>
                  ))}
                </ul>
              </div><hr />

              <h2 className='underline2'>Area of Interest:</h2>
              <ul className="detail-list2">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith('areaOfInterest') && additionalDetails[key].trim() !== ''
                  )
                  .map((key) => (
                    <li key={key} className='line-height2'>{additionalDetails[key]}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp2;
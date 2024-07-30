import React, { useState } from "react";
import "./Temp4.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Temp4 = () => {
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

  const resumeData = JSON.parse(sessionStorage.getItem("resumeData"));

  const {
    studentDetails,
    educationDetails,
    additionalDetails,
    personalDetails,
    experience,
  } = resumeData;

  const downloadPDF = () => {
    const capture = document.querySelector(".resume-container4");

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      doc.save("Resume.pdf");
    });
  };

  return (
    <div>
      <h2>
        If you want Image in your resume Please upload the Image in below input
        box{" "}
      </h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <button onClick={downloadPDF}>Download</button>
      <div id="box4">
        <div className="resume-container4">
          <div className="right-side4">
            <div id="top-center4">
              {userImage && (
                <img
                  src={userImage}
                  alt="Uploaded"
                  width={130}
                  height={130}
                  id="img4"
                />
              )}
              <strong className="underline4 top4">
                {studentDetails.firstname} {studentDetails.lastname}
              </strong>
              <a className="top4" href={`mailto:${studentDetails.email}`}>
                {studentDetails.email}
              </a>
              <p className="underline4 top4" id="phone4">
                {studentDetails.phonenumber}
              </p>
            </div>

            <div className="section4">
              <h2 className="underline4">Contact Details:</h2>
              {Object.keys(studentDetails).map(
                (key, index) =>
                  // Check if the value is not empty before rendering
                  studentDetails[key].trim() !== "" &&
                  index > 3 && (
                    <p key={index} className="ml4">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                      {studentDetails[key]}
                    </p>
                  )
              )}
            </div>
            <hr />

            <div className="section4">
              <h2 className="underline4">Personal Details:</h2>
              <p className="ml4">Date of Birth: {personalDetails.dob}</p>
              <p className="ml4">
                Father's Name: {personalDetails.fathersName}
              </p>
              <p className="ml4">Gender: {personalDetails.gender}</p>
              <p className="ml4">
                Language Proficiency: {personalDetails.languageProficiency}
              </p>
              <p className="ml4">
                Marital Status: {personalDetails.maritalStatus}
              </p>
              <p className="ml4">Nationality: {personalDetails.nationality}</p>
              <p className="ml4">
                Native Place: {personalDetails.placeOfBirth}
              </p>
            </div>
            <hr />

            <div className="section4">
              <h2 className="underline4">Hobbies:</h2>
              <ul>
                {experience.hobbies.map((hobby, index) => (
                  <li key={index} className="line-height4">
                    {hobby.name}
                  </li>
                ))}
              </ul>
            </div>
            <hr />

            <h2 className="underline4">Area of Interest:</h2>
            <ul className="detail-list4">
              {Object.keys(additionalDetails)
                .filter(
                  (key) =>
                    key.startsWith("areaOfInterest") &&
                    additionalDetails[key].trim() !== ""
                )
                .map((key) => (
                  <li key={key} className="line-height4">
                    {additionalDetails[key]}
                  </li>
                ))}
            </ul>
            <hr />

            <div className="section4">
              <h2 className="underline4">Personal Skills:</h2>
              <ul className="detail-list4">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith("personalSkill") &&
                      additionalDetails[key].trim() !== ""
                  )
                  .map((key) => (
                    <li key={key} className="line-height4">
                      {additionalDetails[key]}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="left-side4">
            <h2 className="underline4">Career Objective: </h2>
            <p className="line-height4">{additionalDetails.careerObjective}</p>
            <hr />

            <div className="section4">
              <h2 className="underline4">Education Details:</h2>
              <h2 className="head-left4">
                {educationDetails.college.qualification}
              </h2>
              <h3 className="black4">
                {" "}
                {educationDetails.college.collegeName}
              </h3>
              <h3 className="black4">
                {educationDetails.college.cgpa}% -{" "}
                {educationDetails.college.passedOutYear}
              </h3>

              <h2 className="head-left4">
                HSC - {educationDetails.twelfth.board}
              </h2>
              <h3 className="black4">{educationDetails.twelfth.schoolName}</h3>
              <h3 className="black4">
                {educationDetails.twelfth.percentage}% -{" "}
                {educationDetails.twelfth.passedOutYear}
              </h3>

              <h2 className="head-left4">
                SSLC - {educationDetails.tenth.board}
              </h2>
              <h3 className="black4"> {educationDetails.tenth.schoolName}</h3>
              <h3 className="black4">
                {educationDetails.tenth.percentage}% -{" "}
                {educationDetails.tenth.passedOutYear}
              </h3>
            </div>
            <hr />

            <div className="section4">
              <h2 className="underline4">Skills:</h2>
              <ul className="detail-list4">
                {Object.keys(additionalDetails)
                  .filter(
                    (key) =>
                      key.startsWith("skills") &&
                      additionalDetails[key].trim() !== ""
                  )
                  .map((key) => (
                    <li key={key} className="line-height4">
                      {additionalDetails[key]}
                    </li>
                  ))}
              </ul>
              <hr />

              {experience.experiences.some(
                (exp) =>
                  exp.title.trim() !== "" || exp.description.trim() !== ""
              ) && <h2 className="underline4">Projects:</h2>}

              {experience.projects.map((project, index) => (
                <div key={index}>
                  <h2 className="head-left4">{project.title}</h2>
                  <p id="project4" className="line-height4 ml4">
                    {project.description}
                  </p>
                </div>
              ))}

              {experience.experiences.some(
                (exp) =>
                  exp.title.trim() !== "" || exp.description.trim() !== ""
              ) &&
                experience.projects.length > 0 && <hr />}

              <div className="section4">
                {experience.experiences.some(
                  (exp) =>
                    exp.title.trim() !== "" || exp.description.trim() !== ""
                ) && <h2 className="underline4 ">Experience:</h2>}

                {experience.experiences.map((exp, index) => (
                  <div key={index}>
                    <h2 className="head-left4">{exp.title}</h2>
                    <p id="experience4" className="line-height4 ml4">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp4;

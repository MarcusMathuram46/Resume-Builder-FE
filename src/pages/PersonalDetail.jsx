import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { protectInstance } from "../services/instance";
import NavBar from "../components/NavBar";
import { ColorRing } from "react-loader-spinner";

const PersonalDetails = () => {
  const [loading, setLoading] = useState(false);

  const initialData = JSON.parse(sessionStorage.getItem("personalDetails")) || {
    fathersName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    languageProficiency: "",
    placeOfBirth: "",
  };

  const [personalInputs, setPersonalInputs] = useState(initialData);

  const fathersNameRef = useRef(null);

  useEffect(() => {
    if (fathersNameRef.current) {
      fathersNameRef.current.focus();
    }
  }, []);

  const personalDetailsPlaceholder = [
    "Father's Name *",
    "Date of Birth *",
    "Gender *",
    "Marital Status *",
    "Nationality *",
    "Language Proficiency *",
    "Native Place *",
  ];

  const navigate = useNavigate();

  const handlePersonalInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handlePersonalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = Object.keys(personalInputs);
    const hasEmptyRequiredFields = requiredFields.some(
      (field) => !personalInputs[field]
    );

    if (hasEmptyRequiredFields) {
      alert("Please fill in all required fields.");
    } else {
      sessionStorage.setItem("personalDetails", JSON.stringify(personalInputs));
      const resumeData = {
        studentDetails: JSON.parse(sessionStorage.getItem("studentDetails")),
        educationDetails: JSON.parse(
          sessionStorage.getItem("educationDetails")
        ),
        additionalDetails: JSON.parse(
          sessionStorage.getItem("additionalDetails")
        ),
        experience: JSON.parse(sessionStorage.getItem("experience")),
        personalDetails: JSON.parse(sessionStorage.getItem("personalDetails")),
      };
      sessionStorage.setItem("resumeData", JSON.stringify(resumeData));
      // console.log(resumeData);
      try {
        const res = await protectInstance.post(
          "/resume/resume-model",
          resumeData
        );

        if (res.data) {
          setLoading(false);
          navigate("/templates");
          // console.log('Data posted successfully');
        }
      } catch (error) {
        // console.error('Error in POST request:', error.message);
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handlePersonalSubmit}>
        <h1>Personal Details</h1>
        {Object.keys(personalInputs).map((inputName, index) => (
          <div key={index}>
            {inputName === "dob" && (
              <label htmlFor={inputName}>
                {personalDetailsPlaceholder[index]}
              </label>
            )}
            {inputName === "dob" ? (
              <input
                type="date"
                id={inputName}
                name={inputName}
                value={personalInputs[inputName]}
                onChange={handlePersonalInputChange}
                required
              />
            ) : inputName === "gender" ? (
              <select
                id={inputName}
                name={inputName}
                value={personalInputs[inputName]}
                onChange={handlePersonalInputChange}
                required
              >
                <option value="" disabled>
                  Select Gender *
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            ) : inputName === "maritalStatus" ? (
              <select
                id={inputName}
                name={inputName}
                value={personalInputs[inputName]}
                onChange={handlePersonalInputChange}
                required
              >
                <option value="" disabled>
                  Select Marital Status *
                </option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            ) : (
              <input
                type="text"
                id={inputName}
                name={inputName}
                placeholder={personalDetailsPlaceholder[index]}
                value={personalInputs[inputName]}
                onChange={handlePersonalInputChange}
                required
                ref={index === 0 ? fathersNameRef : null}
              />
            )}
          </div>
        ))}
        <button onClick={() => navigate("/experience")}>Previous</button>
        <div id="centr">
          {loading ? (
            <button type="submit">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#abbd81", "#f8b26a", "#849b87", "#e15b64", "#f47e60"]}
              />
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;

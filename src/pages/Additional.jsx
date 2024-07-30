import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Additional = () => {
  const initialData = JSON.parse(sessionStorage.getItem('additionalDetails')) || {
    skills1: '',
    skills2: '',
    skills3: '',
    skills4: '',
    skills5: '',
    areaOfInterest1: '',
    areaOfInterest2: '',
    areaOfInterest3: '',
    areaOfInterest4: '',
    areaOfInterest5: '',
    careerObjective: '',
    personalSkill1: '',
    personalSkill2: '',
    personalSkill3: '',
    personalSkill4: '',
    personalSkill5: '',
  };

  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('additionalDetails', JSON.stringify(formData));
    navigate('/experience');
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='skills'>Programming Languages *</label>
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type="text"
            id={`skills${index + 1}`}
            name={`skills${index + 1}`}
            placeholder={`Language ${index + 1} ${index < 2 ? '*' : ''}`}
            value={formData[`skills${index + 1}`]}
            onChange={handleInputChange}
            required={index < 2}
            ref={index === 0 ? firstInputRef : null}
          />
        ))}
      </div>

      <div>
        <label htmlFor='areaOfInterest'>Area of Interest *</label>
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type="text"
            id={`areaOfInterest${index + 1}`}
            name={`areaOfInterest${index + 1}`}
            placeholder={`Area of Interest ${index + 1} ${index < 2 ? '*' : ''}`}
            value={formData[`areaOfInterest${index + 1}`]}
            onChange={handleInputChange}
            required={index < 2}
          />
        ))}
      </div>

      <div>
        <label htmlFor='careerObjective'>Career Objective *</label>
        <input
          type="text"
          id="careerObjective"
          name="careerObjective"
          placeholder="Career Objective *"
          value={formData.careerObjective}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor='personalSkills'>Personal Skills *</label>
        {[...Array(5)].map((_, index) => (
          <input
            key={index}
            type="text"
            id={`personalSkill${index + 1}`}
            name={`personalSkill${index + 1}`}
            placeholder={`Personal Skill ${index + 1} ${index < 2 ? '*' : ''}`}
            value={formData[`personalSkill${index + 1}`]}
            onChange={handleInputChange}
            required={index < 2}
          />
        ))}
      </div>

      <button onClick={() => navigate('/education')}>Previous</button>
      <button type="submit">Next</button>
    </form>
    </div>
  );
};

export default Additional;
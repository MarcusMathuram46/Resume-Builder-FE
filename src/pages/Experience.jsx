import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Experience = () => {
  const initialExperience = { title: '', description: '' };
  const [experiences, setExperiences] = useState([initialExperience]);
  const [projects, setProjects] = useState([{ title: '', description: '' }]);
  const [hobbies, setHobbies] = useState([
    { id: 1, name: '', required: true },
    { id: 2, name: '', required: true },
    { id: 3, name: '', required: false },
    { id: 4, name: '', required: false },
    { id: 5, name: '', required: false },
  ]);

  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
    const storedExperience = sessionStorage.getItem('experience');
    if (storedExperience) {
      const { experiences: storedExperiences, projects: storedProjects, hobbies: storedHobbies } =
        JSON.parse(storedExperience);
      setExperiences(storedExperiences || [initialExperience]);
      setProjects(storedProjects || []);
      setHobbies(storedHobbies || []);
    }
  }, []);

  const handleInputChange = (e, section, index) => {
    const { name, value } = e.target;

    if (section === 'experience') {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
      setExperiences(updatedExperiences);
    } else if (section === 'projects') {
      const updatedProjects = [...projects];
      updatedProjects[index] = { ...updatedProjects[index], [name]: value };
      setProjects(updatedProjects);
    } else if (section === 'hobbies') {
      const updatedHobbies = [...hobbies];
      updatedHobbies[index] = { ...updatedHobbies[index], [name]: value };
      setHobbies(updatedHobbies);
    }
  };

  const handleExperienceAdd = () => {
    setExperiences((prevExperiences) => [...prevExperiences, { ...initialExperience }]);
  };

  const handleProjectAdd = () => {
    setProjects((prevProjects) => [...prevProjects, { title: '', description: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('experience', JSON.stringify({ experiences, projects, hobbies }));
    navigate('/personal');
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <h1>Experience</h1>
        {experiences.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              id={`experienceTitle${index}`}
              name="title"
              placeholder={`Experience Title ${index + 1}`}
              value={exp.title}
              onChange={(e) => handleInputChange(e, 'experience', index)}
              ref={index === 0 ? titleRef : null}
            />
            <textarea
              name="description"
              placeholder={`Experience Description ${index + 1}`}
              value={exp.description}
              onChange={(e) => handleInputChange(e, 'experience', index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleExperienceAdd}>
          Add Experience
        </button>

        <div>
          <h1>Projects</h1>
          {projects.map((project, index) => (
            <div key={index}>
              <input
                type="text"
                id={`projectTitle${index}`}
                name="title"
                placeholder={`Project Title ${index + 1}`}
                value={project.title}
                onChange={(e) => handleInputChange(e, 'projects', index)}
              />
              <textarea
                name="description"
                placeholder={`Project Description ${index + 1}`}
                value={project.description}
                onChange={(e) => handleInputChange(e, 'projects', index)}
              />
            </div>
          ))}
          <button type="button" onClick={handleProjectAdd}>
            Add Project
          </button>
        </div>

        <div>
          <h1>Hobbies</h1>
          {hobbies.map((hobby, index) => (
            <div key={index}>
              <input
                type="text"
                id={`hobby${index + 1}`}
                name="name"
                placeholder={`Hobby ${index + 1} ${hobby.required ? '*' : ''}`}
                value={hobby.name}
                onChange={(e) => handleInputChange(e, 'hobbies', index)}
                required={hobby.required}
              />
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/additional')}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Experience;
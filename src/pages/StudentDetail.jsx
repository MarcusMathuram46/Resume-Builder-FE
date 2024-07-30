import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';

const StudentDetails = () => {
  const initialData = JSON.parse(sessionStorage.getItem('studentDetails')) || {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    address: '',
    github: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    twitter: '',
  };

  const [inputs, setInputs] = useState(initialData);

  const firstNameRef = useRef(null);

  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  const placeholder = [
    'First Name *',
    'Last Name *',
    'Email *',
    'Phone Number *',
    'Address *',
    'Github',
    'Linked In',
    'Facebook',
    'Instagram',
    'Twitter'
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phonenumber') {
      if (!/^\d+$/.test(value)) {
        return;
      }
    }
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = Object.keys(inputs).slice(0, 5);
    const hasEmptyRequiredFields = requiredFields.some(field => !inputs[field]);

    if (hasEmptyRequiredFields) {
      alert('Please fill in all required fields.');
    } else {
      sessionStorage.setItem('studentDetails', JSON.stringify(inputs));
      navigate('/education');
    }
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <h1>Student Details</h1>
        {Object.keys(inputs).map((inputName, index) => (
          <div key={index}>
            <input
              type={index==2?"email":"text"}
              id={inputName}
              name={inputName}
              placeholder={placeholder[index]}
              value={inputs[inputName]}
              onChange={handleInputChange}
              required={index < 5}
              minLength={index==3?10:0}
              ref={index === 0 ? firstNameRef : null}
            />
          </div>
        ))}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default StudentDetails;
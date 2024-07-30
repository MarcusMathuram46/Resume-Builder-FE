import React from 'react'
import { Link } from 'react-router-dom'
import './Templates.css';
import NavBar from '../components/NavBar';

function Templates() {
  return (
    <div>
      <NavBar />
      <h1 id='templates'>CHOOSE ANY TEMPLATE</h1>
      <p className="subtext">Stand out from the crowd with a professionally designed resume. Pick a template that suits your style and impress recruiters!</p>
      <div className="template-links">
        <Link to="/temp1">
          <img src="/images/Temp1.jpg" alt="Image 1" className='temps' width={200} height={200} />
        </Link>
        <Link to="/temp2">
          <img src="/images/Temp2.jpg" alt="Image 2" className='temps' width={200} height={200} />
        </Link>
        <Link to="/temp3">
          <img src="/images/Temp3.jpg" alt="Image 3" className='temps' width={200} height={200} />
        </Link>
        <Link to="/temp4">
          <img src="/images/Temp4.jpg" alt="Image 4" className='temps' width={200} height={200} />
        </Link>
        <Link to="/temp5">
          <img src="/images/Temp5.jpg" alt="Image 5" className='temps' width={200} height={200} />
        </Link>
      </div>
    </div>
  );
}

export default Templates
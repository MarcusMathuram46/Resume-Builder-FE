import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import ResetPassword from './components/ResetPassword'
import EmailSend from './components/EmailSend'
import Activated from './components/Activated'
import './App.css';
import Additional from './pages/Additional'
import StudentDetail from './pages/StudentDetail'
import PersonalDetail from './pages/PersonalDetail'
import Education from './pages/Education'
import Templates from './pages/Templates'
import Temp1 from './pages/Temp1'
import Temp2 from './pages/Temp2'
import Temp3 from './pages/Temp3'
import Experience from './pages/Experience'
import Temp4 from './pages/Temp4'
import Temp5 from './pages/Temp5'

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/login' element={ <SignIn /> } />
            <Route path='/register' element={<SignUp />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/emailSend' element={ <EmailSend /> } />
            <Route path='/resetPassword/:randomString' element={<ResetPassword />} />
            <Route path='/activate/:activationToken' element={<Activated />} />
            <Route path="/student" element={<StudentDetail />} />
            <Route path="/education" element={<Education />} />
            <Route path="/additional" element={<Additional />} />
            <Route path='/experience' element={<Experience />} />
            <Route path="/personal" element={<PersonalDetail />} />
            <Route path='/templates' element={<Templates />} />
            <Route path='/temp1' element={<Temp1 />} />
            <Route path='/temp2' element={<Temp2 />} />
            <Route path='/temp3' element={<Temp3 />} />
            <Route path='/temp4' element={<Temp4 />} />
            <Route path='/temp5' element={ <Temp5 /> } />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
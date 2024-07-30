import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import userInst from '../services/user';
import { ColorRing } from 'react-loader-spinner';
import NavBar from './NavBar';
import { protectInstance } from '../services/instance';

function SignIn() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        const user = await userInst.signIn(loginForm, setMsg);

        setLoading(false);

        setLoginForm({
            email: '',
            password: ''
        });

        let resumeData = JSON.parse(sessionStorage.getItem('resumeData'));
        
        let personalDetails = JSON.parse(sessionStorage.getItem('personalDetails'));
        
        if (personalDetails) {
            setLoading(true);

            const res = await protectInstance.post('/resume/resume-model', resumeData);

            if (res.data) {
                setLoading(false);
                navigate('/templates');
            }
        }
        else{
        if (!user) {
            sessionStorage.removeItem('loggedInUser');
            setMsg('Entered a Wrong Email or Password');
        } else {
            navigate('/');
        }}
    };

    return (
        <div>
            <NavBar />
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <input
                        type='email'
                        placeholder='Enter your Email'
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                    />
                </div>
                {
                    <h3>{msg}</h3>
                }
               
                <div>
                    {loading ? (
                        <button type="submit"><ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#abbd81', '#f8b26a', '#849b87', '#e15b64', '#f47e60']}
                        /></button>
                    ) : (
                        <button type="submit">Login</button>
                    )}
                    <h3><Link to='/emailSend'>Reset Password</Link></h3>
                </div>

                <h2>
                    New User ? <Link to='/register'>REGISTER</Link>
                </h2>
            </form>
        </div>
    );
}

export default SignIn;
import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from './../../hooks/useAuth';


const Login = () => {

    const { googleSignIn, setUser, setError } = useAuth()
    const location = useLocation()
    const history = useHistory()
    const redirect_url = location.state?.from || '/'

    const handleGoogleLogin = () => {
        googleSignIn().then((result) => {
            history.push(redirect_url)
            setUser(result.user);
        }).catch((error) => {
            setError(error.message);
        });
    }

    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h2>Log In Please</h2>
                <form>
                    <input type="email" placeholder="email" />
                    <br />
                    <input type="password" placeholder="password" />
                    <br />
                    <input type="submit" value="Submit" className="btn-regular" />
                </form>
                <p>new to Emma-Jhon? <Link to="register">Create Account</Link></p><br />
                <div>------or-------</div><br />
                <button className="btn-regular" onClick={handleGoogleLogin}>Google Sign In</button>

            </div>
        </div>
    )
}

export default Login

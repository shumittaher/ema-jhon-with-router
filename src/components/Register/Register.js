import React from 'react'
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h2>Create Account</h2>
                <form onSubmit="">
                    <input type="email" placeholder="email" /><br />
                    <input type="password" placeholder="password" /><br />
                    <input type="password" placeholder="re-enter password" /><br />
                    <input type="submit" className="btn-regular" value="Submit" />
                </form>

                <p>Already have account in Emma-Jhon? <Link to="Login">Login</Link></p><br />
                <div>------or-------</div><br />
                <button className="btn-regular">Google Sign In</button>
            </div>
        </div>
    )
}

export default Register

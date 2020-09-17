import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../AppContext'
const Login = () => {
    const [formData, setData] = useState(() => {
        return ({
            email: '',
            password: ''
        })
    })

    const context = useContext(AppContext)

    const onChange =(e) => {
        setData({ ...formData, [e.target.name]: e.target.value })
    }
    const submitHandler =async (e) => {
        e.preventDefault()
        try {
            const email = formData.email
            const password=formData.password
            const body = JSON.stringify({email,password})
            console.log(body);

            const config = {
                headers:{
                    "Content-Type":"application/json"
                }
            }
            const res=await axios.post('/api/users/login',body,config)
            if (res.status == 200){
                return context.update(res.data.token,res.data.name)
            }
        } catch (error) {
         console.log("from CATCH");   
        }
    }
    return (
        
        <section className="container">
            <div className="alert alert-danger">
                Invalid credentials
            
            </div>
            
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
            <form className="form" action="dashboard.html" onSubmit={(e) => submitHandler(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        onChange={(e) => onChange(e)}

                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </section>
        
    )
}

export default Login

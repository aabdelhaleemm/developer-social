import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../AppContext'
import axios from "axios"
const Register = () => {
  const [formData, setData] = useState(() => ({
    name: '',
    email: '',
    password: '',
    password2: ''
  }))
  const context = useContext(AppContext)
  const nameHandler = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value })

  }
  const submitHandler = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.password2) {
      alert('password does not match')
    }
    try {
      const email = formData.email
      const password = formData.password
      const name = formData.name
      const body = JSON.stringify({ name, email, password })
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const res = await axios.post('/api/users/register', body, config)
      console.log(res);
      if (res.status == 200) {
        return context.update(res.data.token, res.data.name)
      }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={(e) => submitHandler(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" required onChange={e => nameHandler(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" onChange={e => nameHandler(e)} />
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={e => nameHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            onChange={e => nameHandler(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  )
}

export default Register

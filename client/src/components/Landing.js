import React ,{useContext}from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../AppContext'


const Landing = () => {
    const things=useContext(AppContext)
   
    
    return (
        <div>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                             <h1 className="x-large"></h1>
                        <p className="lead">
                            Create a developer profile/portfolio, share posts and get help from
                            other developers
                        </p>
                        <div className="buttons">
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                            <Link to="/login" className="btn btn-light">Login</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}
export default Landing

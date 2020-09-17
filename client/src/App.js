import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from './components/NavBar'
import Landing from './components/Landing';
import './App.css';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AppContext from "./AppContext";

function App() {
  const updateCon=(token,userName)=>{
    setData({...contexData , token , userName})
  }
  const [contexData,setData]=useState({
    token:null,
    userName:null,
    update:updateCon
  })

  if(!localStorage.getItem("dev-social")){
    const {token,userName}= contexData
    localStorage.setItem("dev-social",{token,userName})
    
  }
  
  if (contexData.userName!=localStorage.getItem('dev-social').userName && contexData.token!=localStorage.getItem('dev-social').token){
    localStorage.setItem("dev-social",JSON.stringify({...contexData}))
  }
  return (
    <AppContext.Provider value={contexData}>
      <Router>
        <NavBar></NavBar>
        <Route exact path="/" component={Landing} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>

      </Router>
      </AppContext.Provider>
  );
}

export default App;

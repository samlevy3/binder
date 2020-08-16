import React from 'react';
import './App.css';

import Home from './components/Home'
import {   BrowserRouter as Router, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import axios from 'axios';

class App extends React.Component {
  state = {
    userData: {
      token: undefined,
      user: undefined
      }
    }

    login = async (email, password) => {
      if (!email || !password) {
        return alert("Please Enter All Field");
      }
      let loginRes = await axios.post('/api/users/login', {email: email, password: password});
      if (loginRes.status === 401) {
        alert(loginRes.msg);
      }
      this.setState({userData: {
        token: loginRes.data.token, user: loginRes.data.user
      }});
      localStorage.setItem("auth-token", loginRes.data.token);
    }
    
    checkIfLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token ="";
        }
        const tokenRes = await axios.post('/api/users/isValidToken', null,
        {headers: { 'x-auth-token': token}});
        if (tokenRes.data) {
          const userRes = await axios.post('/api/users/getUser', null, {headers: { 'x-auth-token': token}
          });
          this.setState({userData: {
            token,
      user: userRes.data,
          }});
        }
    }

  componentDidMount() {
    this.checkIfLoggedIn();
  }
  
  render() {
    return (

      <Router>
        <div>
        <Route render={props => (
         <React.Fragment>
           <Welcome />
          </React.Fragment>
        )}/>
        </div>
      </Router>
    );

  }
}

export default App;

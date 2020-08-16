import React from 'react';
import './App.css';
import NewUser from './components/NewUser';
import Login from './components/Login';


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

    register = async(name, email, password, phone, courses) => {
      await axios.post('api/users/register', {
        name, 
        email,
        password,
        phone,
        courses
      })
      this.login(email, password);
    }

    login = async (email, password) => {
      console.log("Loggin in")
      if (!email || !password) {
        return alert("Please Enter All Fields");
      }
      let loginRes = await axios.post('/api/users/login', {email: email, password: password});

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
        const tokenRes = await axios.post('/api/users/isValidToken',
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
        <Route exact path="/login" render={props => (
         <React.Fragment>
           <NewUser register={this.register}/>
          </React.Fragment>
        )}/>
        </div>
      </Router>
    );

  }
}

export default App;

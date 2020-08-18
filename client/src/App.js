import React from 'react';
import './App.css';
import NewUser from './components/NewUser';
import Login from './components/Login';
import history from './history';
import Header from './components/layouts/Header';

import Home from './components/Home'
import {  Router, Route } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
  
  state = {
    userData: {
      token: undefined,
      user: undefined
      }
  }

  register = async(name, email, password, phone, classes) => {
      try {
        await axios.post('api/users/register', {
          name, 
          email,
          password,
          phone,
          classes
        })
        this.login(email, password);
      } catch (err) {
        alert (err.response.data.msg);
      }
  }

  login = async (email, password) => {
      try {
        if (!email || !password) {
          return alert("Please Enter All Fields");
        }
        let loginRes = await axios.post('/api/users/login', {email: email, password: password});

        this.setState({userData: {
          token: loginRes.data.token, user: loginRes.data.user
        }});
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push('/home');
      } catch (err) {
        alert (err.response.data.msg);
      }
  }

  logout = () => {
    localStorage.setItem("auth-token", "");
    this.setState({token: undefined, user: undefined});
    history.push('/');
    window.location.reload(false);
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
          history.push('/home');
        }
  }

  componentDidMount() {
    this.checkIfLoggedIn();
    
  }
  
  render() {
    
    return (
      <Router history={history}>
        <Header logout={this.logout} loggedIn={this.state.userData}/>
        <div>
        <Route exact path="/register" render={props => (
         <React.Fragment>
           <NewUser register={this.register}/>
          </React.Fragment>
        )}/>
      <Route exact path="/" render={props => (
         <React.Fragment>
           <Login login={this.login}/>
          </React.Fragment>
        )}/>
        <Route exact path="/login" render={props => (
         <React.Fragment>
           <Login login={this.login}/>
          </React.Fragment>
        )}/>
        {this.state.userData.user ? 
        <Route path = '/home' render={props => (
         <React.Fragment>

           <Home user={this.state.userData.user}/>

          </React.Fragment>
        )}/>
        : <Route path='/home' render={props => (
          <React.Fragment>
            <Login login={this.login}/>
           </React.Fragment>
         )}/>}
        </div>
      </Router>
    );

  }
}

export default App;

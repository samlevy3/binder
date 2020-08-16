import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        if (email !== '' && password !== '') {
            this.props.login(email, password);
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    return (
      <div style={{
        display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0',
      }}>
      <div style={{
        padding: '10px', 
        border: '1px solid #ccc', 
        borderRadius: '4px', 
        textAlign: 'center', 
        margin: '50px',
        width: '300px'
        }}>
       <h4 style={{margin: '7px'}}>
         Login
       </h4>
        <form onSubmit={this.onSubmit} style={{display: 'block', width: '100%', textAlign:'center'}}>
          <input 
			  		type="email" 
					  name="email"
					  style={formStyle}
				    placeholder="Email"
				    value={this.state.email}
				    onChange={this.onChange}
			  	/>
            
          <input 
		  		  type="password" 
					  name="password"
				    style={formStyle}
				    placeholder="Password"
				    value={this.state.password}
				    onChange={this.onChange}
				  />

				  <input 
					  type="submit"
					  value="Login"
					  className="btn"
					  style={{flex: '1'}}
				  />
			  </form>
        <p style={{margin: '5px'}}><Link style={{padding: '5px', fontSize: '10px'}} to="/register">Don't have an account? Register now.</Link></p>
      </div>
      </div>
    )
  }
  
}

const formStyle = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box'
}

export default Login;
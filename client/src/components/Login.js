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
        border: '1px solid #4b2e83', 
        borderRadius: '4px', 
        textAlign: 'center', 
        margin: '50px',
        width: '300px'
        }}>
       <h4 style={{margin: '7px', color: '#4b2e83'}}>
         Login
       </h4>
        <form onSubmit={this.onSubmit} style={{display: 'block', width: '100%', textAlign:'center', color: '#4b2e83'}}>
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
            onSubmit={this.onSubmit}
					  style={{color: '#4b2e83',
            background: '#F3F3F3',
            border: '1px #4b2e83 solid',
            padding: '5px 10px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '.7em',
            outline: 'none',
            marginLeft: '5px',}}
				  />
			  </form>
        <p style={{margin: '5px'}}><Link style={{padding: '5px', fontSize: '12px'}} to="/register">Don't have an account? Register now.</Link></p>
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
  border: '1px solid #4b2e83',
  borderRadius: '4px',
  boxSizing: 'border-box',
}

export default Login;
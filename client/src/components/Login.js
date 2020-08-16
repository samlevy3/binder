import React from 'react';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email, password} = this.state;
        console.log(this.state)
        if (email !== '' && password !== '') {
            console.log("step 2")
            this.props.login(email, password);
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });


  render() {
    return (
      <div style={{padding: '10px'}}>
       Login
        <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
                <input 
			  		type="email" 
					name="email"
					style={{flex: '10', padding: '5px'}}
					placeholder="Email"
					value={this.state.email}
					onChange={this.onChange}
				/>
            
                <input 
			  		type="password" 
					name="password"
					style={{flex: '10', padding: '5px'}}
					placeholder="Password"
					value={this.state.password}
					onChange={this.onChange}
				/>
				<input 
					type="submit"
					value="Submit"
					className="btn"
					style={{flex: '1'}}
				/>
			</form>
      </div>
    )
  }
}

export default Login;
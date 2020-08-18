import React from 'react';
import Logo from '../logo.png';
import history from '../../history';

class Header extends React.Component {
  
	state = {
		loggedIn: this.props.loggedIn.user,
	}
	onLogout =(e) => {
		this.setState({
			loggedIn: false
		})
		this.props.logout();
	}

	onRegister = (e) => {
		history.push('/register')
	}

	onLogin = (e) => {
		history.push('/login')
	}

	render() {
		return (
			<header style={headerStyle}>
				<h1 style={{margin: '2%'}}><img src={Logo} alt='logo' style={{display: 'inline', width: 'auto', height: '45px', marginRight: '2px', marginBottom: '0'}}></img>binder</h1>
				{!this.props.loggedIn.user ? 
					<>
	
					</>
					:
						<h4 style={{margin: '0'}}>Hello {this.props.loggedIn.user.name}!
						<button onClick={this.onLogout} style={loggedInBtnStyle}
							>Logout
						</button>
						</h4>
				}
				
			</header>
		);
	}
	
}

const loggedOutBtnStyle = {
	color: '#4b2e83',
	background: '#F3F3F3',
	border: '1px #DADADA solid',
	padding: '5px 10px',
	borderRadius: '12px',
	fontWeight: 'bold',
	fontSize: '.7em',
	outline: 'none',
	marginRight: '16px',
	marginLeft: '16px',
	display: 'inline-block',
};

const loggedInBtnStyle = {
	color: '#4b2e83',
	background: '#F3F3F3',
	border: '1px #DADADA solid',
	padding: '5px 10px',
	borderRadius: '12px',
	fontWeight: 'bold',
	fontSize: '.7em',
	outline: 'none',
	marginLeft: '10px',
};


const headerStyle = {
	textAlign: 'center', 
	backgroundColor: '#4b2e83', 
	color: '#fff', 
	padding: '5px',
	marginBottom: '20px',
	fontSize: '2em',
	width: '100%'
}


export default Header
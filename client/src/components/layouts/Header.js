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

	onEthics = (e) => {
		history.push('/ethics')
	}

	render() {
		return (
			<header style={headerStyle}>
				<ul style=
				{{
					listStyleType: 'none',
					display: 'flex',
					justifyContent: 'space-around',
					margin: '0'
				}}>
					<li style={logoStyle}>
						<img src={Logo} alt='logo' style=
						{{						
							width: 'auto', 
							height: '45px', 
							marginRight: '2px', 
							marginBottom: '0',
						}}>
						</img>
						binder
					</li>
					<li style={listStyle}>
						{!this.props.loggedIn.user? 
							<>
								<button onClick={this.onLogin} style={loggedInBtnStyle}>
									Login
								</button> |
								<button onClick={this.onRegister} style={loggedInBtnStyle}>
									Register
								</button> |
							</>
							:
							<>
								<button onClick={this.onLogout} style={loggedInBtnStyle}>
									Logout
								</button> |
							</>
						}	
						<button onClick={this.onEthics} style={loggedInBtnStyle}>
							Ethics
						</button> |
						<a style={loggedInBtnStyle} rel="noopener noreferrer" target="_blank" href="https://github.com/samlevy3/binder">
							GitHub
						</a>
					</li>
				</ul>
			</header>
		);
	}
	
}

const loggedInBtnStyle = {
	color: 'white',
	background: '#412970',
	border: '1px #DADADA solid',
	padding: '5px 10px',
	borderRadius: '12px',
	fontWeight: 'bold',
	fontSize: '.7em',
	outline: 'none',
	marginLeft: '10px',
	textDecoration: 'none',
	cursor: 'pointer'
};

const logoStyle= {
	fontSize: '2em',
	fontWeight: 'bold',
	flex: '1',
	marginRight: '20%'
}

const listStyle = {
	fontSize: '1em',
	alignSelf: 'stretch',
	marginRight: '20px',
	padding: '20px 0px',
	display: 'inline-block'
}

const headerStyle = {
	textAlign: 'center', 
	backgroundColor: '#412970', 
	color: '#fff', 
	padding: '20px',
	fontSize: '2em',
	marginBottom: '20px'
}


export default Header
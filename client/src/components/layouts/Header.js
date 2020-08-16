import React from 'react';
import Logo from '../logo.png';
import DropdownMenu from '../DropdownMenu';

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

	render() {
		return (
			<header style={headerStyle}>
				<div style={{
					display: 'flex',
					justifyContent: 'center',
					position: 'relative'
				}}>
					<img src={Logo} alt='logo' style={{display: 'block', width: 'auto', height: '50px', marginTop: '37px', marginRight: '-10px'}}></img>
				<h1 style={{margin: '20px', textAlign: 'center'}}>binder</h1>
				{this.props.loggedIn.user ? <DropdownMenu onLogout={this.onLogout} user={this.props.loggedIn.user} />: null}
				</div>
			</header>
		);
	}
	
}

const headerStyle = {
	background: '#4b2e83',
	color: '#fff',
	padding: '10px',
	fontSize: '2em',
}

export default Header
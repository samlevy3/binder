import React from 'react';

class Header extends React.Component {
	state = {
		loggedIn: this.props.loggedIn.user
	}
	onClick =(e) => {
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
				<h1 style={{margin: '20px', textAlign: 'center'}}>binder</h1>
				{this.props.loggedIn.user ? <button style={btnStyle} onClick={this.onClick}>Logout</button>: null}
				</div>
			</header>
		);
	}
	
}

const btnStyle = {
	border: 'none',
	backgroundColor: '#ccc',
	padding: 'none',
	color: 'black',
	fontSize: '0.5em',
	float: 'right',
	position: 'absolute',
	right: '0',
	borderRadius: '4px'

}

const headerStyle = {
	background: '#4b2e83',
	color: '#fff',
	padding: '10px',
	fontSize: '2em',
}

export default Header
import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
	state = {
		loggedIn: this.props.loggedIn.user
	}
	onClick =(e) => {
		this.setState({
			loggedIn: !this.state.loggedIn
		})
		this.props.logout();
	}

	render() {
		return (
			<header style={headerStyle}>
				<h1>binder</h1>
				{this.props.loggedIn.user ? <button style={btnStyle} onClick={this.onClick}>Logout</button>: null}
			</header>
		);
	}
	
}

const btnStyle = {
	border: 'none',
	backgroundColor: '#404040',
	padding: 'none',
	color: 'white',
	fontSize: '1em',
	display: 'flex',

}

const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '1px',
	fontSize: '30px'
}

export default Header
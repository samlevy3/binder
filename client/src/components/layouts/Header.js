import React from 'react';

function Header() {
	return (
		<header style={headerStyle}>
			<h1>binder</h1>
		</header>
	)
}

const headerStyle = {
	background: '#333',
	color: '#fff',
	textAlign: 'center',
	padding: '1px',
	fontSize: '30px'
}

export default Header
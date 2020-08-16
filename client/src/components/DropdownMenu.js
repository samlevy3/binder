import React from 'react';

class DropdownMenu extends React.Component {
  
	state = {
		showMenu: false
    }
    
    onClick = (e) => {
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
    }
        
    closeMenu = () => {
        this.setState({ showMenu: false });
        document.removeEventListener('click', this.closeMenu);
    }

	render() {
		return (
            <div>
			    <button style={btnStyle} onClick={this.onClick}>Hi, {this.props.user.name}!</button>
                {
                    this.state.showMenu ? 
                    (
                    <div style={menuStyle}>
                        <button style={menuItemStyle} onClick={this.props.onLogout}> Logout </button>
                    </div>
                    ) : (
                        null
                    )

                }
            </div>
		);
    }
	
}

const btnStyle = {
	backgroundColor: '#4b2e83',
	padding: 'none',
	color: 'white',
	fontSize: '0.4em',
	float: 'right',
	position: 'absolute',
	right: '10px',
	borderRadius: '4px',
	border: '1px solid white'
}

const menuStyle = {
	padding: 'none',
	fontSize: '0.4em',
	float: 'right',
	position: 'absolute',
    right: '10px',
    top: '20px',
    width: '90px'
}

const menuItemStyle = {
    backgroundColor: 'white',
    color: '#4b2e83',
    border: 'none',
    borderBottom: '1px dotted #ccc',
    width: '100%',
    textAlign: 'left',
    padding: '5px 10px'
}

export default DropdownMenu
import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '0'
    }
    const boxStyle = {
      textAlign: 'center',
      width: '20%',
      position: 'relative', 
      fontSize: '2em',
      margin: '0',
    }
    const pStyle = {
      backgroundColor: '#8c8c8c',
      height: '100%',
      padding: '20px',
      margin: '0',
      border: '1px solid black',
    }
    const linkStyle = {
      textDecoration: 'none', 
      display: 'block', 
      color: 'black'
    }
    return (
      <div style={containerStyle}>
        <div style={boxStyle}>
            <p style={pStyle}><Link style={linkStyle} to="/login">Login</Link></p>
            <p style={pStyle}><Link style={linkStyle} to="/register">Register</Link></p>
        </div>
      </div>
    );
  }
}

export default Welcome;

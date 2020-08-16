import React, {Component} from 'react';
import FriendList from "./FriendList"

class GroupBox extends Component {


    render() {
        
        if (this.props.visible) {
            const group = this.props.group
            
            return (
                <div style={groupBoxStyle}>
                    <h4 style={{color: '#4b2e83'}}>{`Group Members for ${group.course}`}</h4> 
                    <FriendList members={group.members.filter(member => member.email !== this.props.userEmail)}/>
                </div>
                
            );
        } else if (!this.props.visible && this.props.group !== null){
            return (
                <div>
                    <p>This class doesn't have a group yet</p>
                </div>
            );
        } else {
            
            return (
                <div></div>
            );
        }
    }


}

const groupBoxStyle = {
    margin: '20px', 
    border: 'solid #4b2e83 2px', 
    padding: '10px 15px',
    width: "100%",
    borderRadius: '10px'
}


export default GroupBox;
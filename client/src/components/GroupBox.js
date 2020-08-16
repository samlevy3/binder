import React, {Component} from 'react';
import FriendList from "./FriendList"

class GroupBox extends Component {

    state = {
        courseName: '',
        memberIds: [] //store user ids
    }

    render() {
        
        if (this.props.visible) {
            const group = this.props.group
            let memberNames = [];
            let i = 0;
            group.members.forEach(memberId => {
                memberNames[i] = `${names[i]} with ID ${memberId}`//replace this with fetching ids
                i += 1
            });
            return (
                <div style={groupBoxStyle}>
                    <h4 >{`Group for ${group.course}`}</h4> 
                    <FriendList members={group.members}/>
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

const names = ["Bob", "Joe", "Fred", "Sam"]

const groupBoxStyle = {
    float:"none", 
    margin: '20px', 
    border: 'solid #363C74 2px', 
    padding: '10px ',
    width: "100%",
    borderRadius: '10px'
}


export default GroupBox;
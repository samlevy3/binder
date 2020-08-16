import React, {Component} from 'react';
import FriendList from "./FriendList"

class GroupBox extends Component {

    state = {
        courseName: '',
        memberIds: [] //store user ids
    }

    render() {
        if (this.props.visible) {
            let memberNames = [];
            let i = 0;
            this.props.group.memberIds.forEach(memberId => {
                memberNames[i] = `${names[i]} with ID ${memberId}`//replace this with fetching ids
                i += 1
            });
            return (
                <div>
                    <h4>{`Group for ${this.props.group.courseName}`}</h4> 
                    <FriendList members={memberNames}/>
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
export default GroupBox;
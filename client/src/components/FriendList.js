import React, {Component} from 'react';
import FriendItem from './GroupList';

class FriendList extends Component {
    render() {
        return this.props.members.map((member) => (
            <FriendItem key={member.id} member={member}/>
        ));
    }
}

export default FriendList;

import React, {Component} from 'react';
import FriendItem from './FriendItem';

class FriendList extends Component {
    render() {
        return this.props.members.map((member) => (
            <FriendItem key={member} member={member}/>
        ));
    }
}

export default FriendList;

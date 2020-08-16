import React, {Component} from 'react';

class FriendItem extends Component {
    render() {
        return (
            <div>
                <p>{this.props.member}</p>
            </div>
        );
    }
}

export default FriendItem;
import React, {Component} from 'react';

class FriendItem extends Component {
    render() {
        return (
            <div>
                <p style={style}>{this.props.member.id}</p>
            </div>
        );
    }
}

const style = {
    backgroundColor:  '#fff' ,
    border: "none",
    borderTop: "solid #EE82EE 1px",
    height: "100%",
    width: "80%",
    textAlign: "center",
    padding: "10px"

}

export default FriendItem;
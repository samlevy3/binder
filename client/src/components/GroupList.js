import React, {Component} from 'react';

class GroupList extends Component {
    render() {
        let { members } = this.props.group;
        members = members.filter(member => member.name !== this.props.user.name);
        return (
            <div style={groupBoxStyle}>
                {
                    this.props.group && this.props.group.members.length > 1 ? 
                        <>
                            {
                                members.map(member => (
                                    <p key={member.id} style={style}>
                                        Name: {member.name}<br></br>
                                        Email: {member.email}<br></br>
                                        Phone Number: {member.phone}
                                    </p>
                                ))
                            } 
                        </>
                        :
                        <p>No Group Currently Assigned</p>
                }
            </div>
        );
    }
}

const style = {
    backgroundColor: '#fff' ,
    color: '#4b2e83',
    borderTop: "solid #4b2e83 1px",
    paddingTop: "5px",
    fontSize: "1.2em",
    width: "100%",
    textAlign: "center",
}

const groupBoxStyle = {
    border: 'solid #4b2e83 2px', 
    padding: '10px 15px',
    borderRadius: '10px',
    width: '50vh',
    overflow: 'scroll',
    marginTop: '2px',
}


export default GroupList;
import React, {Component} from 'react';

class GroupList extends Component {
    render() {
        let { members } = this.props.group;
        members = members.filter(member => member.name !== this.props.user.name);
        return (
            <div style={groupBoxStyle}>
                {
                    members && members.length > 0 ? 
                        <>
                            {
                                members.map(member => (
                                    <p key={member.id} style={style}>
                                        <span style={{fontWeight: 'bold'}}>Name:</span> {member.name}<br></br>
                                        <span style={{fontWeight: 'bold'}}>Email:</span> {member.email}<br></br>
                                        <span style={{fontWeight: 'bold'}}>Phone Number:</span> {member.phone}
                                    </p>
                                ))
                            } 
                        </>
                        :
                        <p style={style}>No Group Currently Assigned</p>
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
    fontSize: "1.7em",
    textAlign: 'left',
    paddingLeft: '37%',
}

const groupBoxStyle = {
    border: 'solid #4b2e83 2px', 
    padding: '10px 15px',
    borderRadius: '10px',
    maxWidth: '60vw',
    overflow: 'scroll',
    marginTop: '2px',
    flex: '2',
    alignSelf: 'center',
    textAlign: "center",
}


export default GroupList;
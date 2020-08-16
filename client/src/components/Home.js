import React, {Component} from 'react';
import Courses from './Courses'
import GroupBox from './GroupBox'
import axios from 'axios'

class Home extends Component {

    state = {
        courses: ["Physics 2212", "Math 2552", "CS 1331"],
        groupDisplay: false,
        currGroup: null,
        groups: []   
    }

    componentDidMount() {
        axios.get('/groups').then(res => this.setState({
            courses: ["Physics 2212", "Math 2552", "CS 1331"],
            groupDisplay: false,
            currGroup: null,
            groups: res.data
        }))
        console.log(this.state.groups)
    }

    userHasGroups() {
        return (this.state.groups.length !== 0);
    }

    render() {
        if (this.userHasGroups()) {
            return (
                <div>
                    
                    
                    <div style={courseBoxStyle}>
                        <h1 style={{textAlign:"center"}}>Groups</h1>
                        <Courses 
                            courses={this.state.courses} 
                            courseClicked={this.courseClicked}
                        />
                    </div>
                    <div style={{float:"left"}}>
                        <GroupBox visible={this.state.groupDisplay} group={this.state.currGroup} />
                    </div>
                    
                </div>
                
                
            );
        }
        else {
            return (
                <div style={centered}>
                    <p style={{textAlign: "center"}}>
                        Looks like you don't have any study groups yet. Click below to find some study partners!
                    </p>
                    <button style={btnStyle} onClick={this.generateGroups}>Find Groups!</button>
                </div>
            );
        }
        
    }

    
    courseClicked = (name) => {
        let groupSelected = null;
        this.state.groups.forEach(group => {
            if (group.courseName === name) {
                console.log(name)
                groupSelected = group;
            
            }
        })
        this.setState({ 
            courses: this.state.courses, 
            groupDisplay: true,
            currGroup: groupSelected,
            groups: this.state.groups
        });
    }

    generateGroups = async () => {
        this.setState({
            courses: ["Physics 2212", "Math 2552", "CS 1331"],
            groupDisplay: false,
            currGroup: null,
            groups: [{
                id: 11,
                courseName: "Physics 2212",
                memberIds: [35243, 2452345, 242345]
            },
            {
                id: 12,
                courseName: "Math 2552",
                memberIds: [1241, 12341325, 436346]
            },
            {
                id: 13,
                courseName: "CS 1331",
                memberIds: [43254, 365356, 43736346]
        }]})
    }

}
const btnStyle= {
    position: "absolute",
    left: "50%",
    msTransform: "translateX(-50%)",
    transform: 'translateX(-50%)',
    backgroundColor: '#FFA500',
    borderRadius: "5px",
    border: "none",
    padding: "5px 10px",
    color: "#000"
}

const centered = {
    margin: "0",
    position: "absolute",
    top: "25%",
    left: "50%",
    msTransform: "translateX(-50%)",
    transform: "translateX(-50%)"
}

const courseBoxStyle = {
    float:"left", 
    margin: '20px', 
    border: 'solid #000 1px', 
    padding: '10px ',
    width: "40%"
}

export default Home;
import React, {Component} from 'react';
import Courses from './Courses'
import GroupBox from './GroupBox'

class Home extends Component {

    state = {
        courses: ["Physics 2212", "Math 2552", "CS 1331"],
        groupDisplay: false,
        currGroup: null,
        groups: [
            {
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
            }
        ]
    }

    render() {
        return (
            <div>
                
                
                <div style={{float:"left", margin: '20px', borderStyle: 'solid'}}>
                    <h1>Groups</h1>
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
}

export default Home;
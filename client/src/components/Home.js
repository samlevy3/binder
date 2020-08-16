import React, {Component} from 'react';
import Courses from './Courses'
import GroupBox from './GroupBox'
import axios from 'axios'

class Home extends Component {

    
    state = {
        courses: this.props.user.classes,
        groupDisplay: false,
        currGroup: null,
        groups: [] ,
        msg: "Looks like you don't have any study groups yet. Click below to find some study partners!"
 
    }


    checkGroups = async () => {
        let token = localStorage.getItem("auth-token");
        await axios.get('/api/groups/forUser', {headers: {"x-auth-token": token}} ).then(res => {
            const groups = res.data;
            this.setState({
                groups
            })
        });
    }

    componentDidMount() {
        this.checkGroups();
    }

    render() {
        
        if (this.state.groups.length > 0) {
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
                        <GroupBox group={this.state.currGroup} visible={this.state.groupDisplay} userEmail={this.props.user.email} />
                    </div>
                    
                </div>
                
                
            );
        }
        else {
            return (
                <div style={centered}>
                    <p style={{textAlign: "center"}}>
                        {this.state.msg}
                    </p>
                    <button style={btnStyle} onClick={this.generateGroups}>Find Groups!</button>
                </div>
            );
        }
        
    }

    
    courseClicked = (name) => {
        let groupSelected = undefined;
        this.state.groups.forEach(group => {
            if (group.course === name) {
                groupSelected = group;
                
            }
        })
        this.setState({ 
            groupDisplay: groupSelected ? true : false,
            currGroup: groupSelected

        });
        
    }

    generateGroups = async () => {
        const courses = this.props.user.classes
        
        if (courses) {
            
            let token = localStorage.getItem("auth-token");
            let groups = []
            for (let i = 0; i<courses.length; i++) {
                await axios.post('/api/groups/generate', {courseName: courses[i].name}, {headers: {"x-auth-token": token}} ).then(res => {
                   if (res.data.msg === null) {
                      groups.push(res.data)

                    } 

                })
             
            }
            let showMsg = groups.length === 0
            this.setState({
                courses,
                groups,
                msg: showMsg ? "Unfortunately there are no available study partners at this time. Please try again later." : undefined

            })
            this.checkGroups();
        }
        this.checkGroups()
        
    }

    
}


const btnStyle= {
    position: "absolute",
    left: "50%",
    msTransform: "translateX(-50%)",
    transform: 'translateX(-50%)',
    backgroundColor: '#4b2e83',
    borderRadius: "5px",
    border: "none",
    padding: "5px 10px",
    color: "#fff"
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
    border: 'solid #4b2e83 2px', 
    color: "#4b2e83",
    padding: '10px ',
    borderRadius: "10px",
    width: "40%"
}

export default Home;
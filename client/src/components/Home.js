import React, {Component} from 'react';
import Courses from './Courses'
import GroupBox from './GroupBox'
import axios from 'axios'

class Home extends Component {

    state = {
        courses: this.props.user.classes,
        groupDisplay: false,
        currGroup: null,
        groups: []   
    }


    checkGroups = async () => {
        let token = localStorage.getItem("auth-token");
        await axios.get('/api/groups/forUser', {headers: {"x-auth-token": token}} ).then(res => {
            const groups = res.data;
            this.setState({
                groupDisplay: false,
                currGroup: null,
                groups
            })
        });
    }

    componentDidMount() {
        console.log(this.props.user.classes);
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
                        <GroupBox group={this.state.currGroup} visible={this.state.groupDisplay}  />
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
        console.log(this.state.courses)
        if (this.state.courses) {
            console.log(this.state.courses)
            let token = localStorage.getItem("auth-token");
            let groups = []
            for (let i = 0; i<courses.length; i++) {
                console.log(`Generating group for ${this.state.courses[i].name}`)
                await axios.post('/api/groups/generate', {courseName: this.state.courses[i].name}, {headers: {"x-auth-token": token}} ).then(res => {
                   if (res.data.msg === null) {
                      groups.push(res.data)
                    }
                    console.log(`Results for ${this.state.courses[i].name}: ${res.data}`)
                })
             
            }
            
            this.setState({
                groupDisplay: false,
                currGroup: null,
                groups,
            })
        }
        
        
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
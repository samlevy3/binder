import React, {Component} from 'react';
import axios from 'axios';
import arrow from './arrow.png';
import sideArrow from './sideArrow.png';
import GroupList from './GroupList';

class Home extends Component {
    state = {
        courses: this.props.user.classes,
        courseDisplay: false,
        currGroup: undefined,
        groups: [],
        msg: ""
 
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

    displayGroup = (course) => {
        for (let i = 0; i < this.state.groups.length; i++) {
            if (this.state.groups[i].course === course.name) 
                return this.setState({currGroup: this.state.groups[i]});
            else {
                this.setState({currGroup: null});
            }
        }
    }

    showCourses = () => {
        this.setState({courseDisplay: !this.state.courseDisplay})
    }

    generateGroups = async () => {
        const courses = this.props.user.classes;
        if (courses) {
            const token = localStorage.getItem("auth-token");
            let groups = [];
            for (let i = 0; i<courses.length; i++) {
                await axios.post('/api/groups/generate', {courseName: courses[i].name}, {headers: {"x-auth-token": token}} ).then(res => {
                if (res.data) {
                    groups.push(res.data);
                    } 
                })
            }
            let showMsg = groups.length === 0
            this.setState({
                courses,
                groups,
                msg: showMsg ? "Unfortunately there are no available study partners at this time. Please try again later." : undefined

            })
        }
        this.checkGroups()   
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

    render()    { 
        if (this.state.groups.length > 0) {
            return (
                <div>
                    <div style={dropdownStyle}>
                        Classes
                        <img alt='Dropdown' onClick={this.showCourses} style={arrowStyle} src={arrow}/>
                        {
                            this.state.courseDisplay ? 
                                <>
                                    <ul style={listStyle}>
                                        {
                                            this.state.courses.map(course => (
                                                <li onClick={this.displayGroup.bind(this, course)} style={btnStyle} key={course._id}>
                                                    {course.name}
                                                    <img alt='arrow' style={arrowStyle} src={sideArrow}/>
                                                </li>
                                            ))
                                        }       
                                    </ul>
                                </>
                            : <></>
                        }
                    </div>
                    <div style={boxStyle}>
                        {this.state.courseDisplay && this.state.currGroup !== undefined ? <GroupList user={this.props.user} group={this.state.currGroup} />: null}
                    </div>
                </div>
            );
        } else {
            return (
                <div style={centered}>
                    <button style={groupButtonStyle} onClick={this.generateGroups}>Find Groups!</button>
                </div>
            );
        }
    }
}

const boxStyle = {
    float: 'left',
}

const dropdownStyle = {
    margin: '0px',
    padding: '20px',
    backgroundColor: '#412970',
    width: '20%',
    minWidth: '300px',
    fontSize: '1.6em',
    fontWeight: 'bold',
    color: 'white',
    borderTop: '2px solid white',
    borderRight: '2px solid white',
    float: 'left',
    paddingLeft: '5px',
}

const arrowStyle = {
    display: 'inline',
    width: '1.3em', 
    float: 'right',
    cursor: 'pointer',
}

const btnStyle = {
    color: 'white',
    fontSize: ".7em",
    fontWeight: "bold",
    margin: '0px',
    padding: '15px',
    listStyleType: 'none',
    border: '1px solid white',
    cursor: 'pointer'
}

const listStyle = {
    margin: '0',
    paddingLeft: '0',
    marginTop: '15px',
    overflow: 'scroll',
    maxHeight: '50vh',
    position: 'sticky',
}   

const centered = {
    marginTop: "30px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const groupButtonStyle = {
    backgroundColor: '#412970',
    color: 'white',
    borderRadius: '12px',
    padding: '10px',
    fontSize: '1em',
    textAlign: 'center'
}

export default Home;

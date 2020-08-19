import React from 'react';
import courses from '../classes.json';

class AddCourse extends React.Component {
    state = {
        title: '',
        courseOptions: []
    }

    onChange = (e) => {
        let values = courses.courses.filter(course => {
            return course.toLowerCase().includes(e.target.value.toLowerCase())
        }).slice(0,200);
        if (values.length === 0) {
            return;
        }
        this.props.displayCourses(values, e.target.value.length);
        this.setState(
            { 
                title: values[0],
                courseOptions: values
            }
        );
    }
    
    render() {
        return (
            <div style={{display: 'flex'}}>   
                <input 
                    autoComplete="off"
                    type="text" 
                    name="title"
                    style={{flex: '10', padding: '5px', fontSize: '12px'}}
                    placeholder="Search New Course ..."
                    value={this.props.title}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default AddCourse;

import React, {Component} from 'react';
import Course from './Course'

class Courses extends Component {
    render() {
        return this.props.courses.map((course) => (
            <Course key={course.length} course={course} courseClicked={this.props.courseClicked}/>
        ));
    }
}

export default Courses;
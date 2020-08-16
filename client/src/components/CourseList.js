import React from 'react';
import CourseItem from './CourseItem';

class CourseList extends React.Component {
  
    render() {
        if (this.props.courses.length === 0){
            return (
                <div>
                    No courses added
                </div>
            )
        } else {
            return (
                this.props.courses.map((course) => (
                    <CourseItem key={course.name} courseName={course.name} deleteCourse={this.props.deleteCourse}/>
                ))
            )
        }
  }
}

export default CourseList;
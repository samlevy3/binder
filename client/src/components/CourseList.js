import React from 'react';
import CourseItem from './CourseItem';

class CourseList extends React.Component {
  
    render() {
        if (this.props.courses.length === 0){
            return (
                <div >
                    No courses added
                </div>
            )
        } else {
            return (
                <div>
                {
                    this.props.courses.map((course) => (
                        <CourseItem key={course} courseName={course} deleteCourse={this.props.deleteCourse}/>
                ))}
                </div>
            )
        }
  }
}

export default CourseList;
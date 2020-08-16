import React from 'react';
import CourseItem from './CourseItem';

class CourseList extends React.Component {
  
    render() {
        return (
            <div style={{height:'150px', overflowY: 'scroll', margin: '10px'}}>
                {this.props.courses.map((course) => (
                    <CourseItem key={course._id} courseName={course.name} deleteCourse={this.props.deleteCourse}/>
                ))}
            </div>
            
        )
  }
}

export default CourseList;
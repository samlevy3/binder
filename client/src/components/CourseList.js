import React from 'react';

class CourseList extends React.Component {
    render() {
        const courseList = this.props.courses.map((course) => 
            <li key={course.name} style={courseStyle}>
                {course.name}
                <button
                    key={course.name}
                    style={btnStyle}
                    onClick={this.props.deleteCourse.bind(this, course.name)}
                >
                        X
                </button>
            </li>
        );
        return (
            <div style={{height:'150px', overflow: 'scroll', margin: '10px'}}>
                <ul>
                    {courseList}
                </ul>
            </div>
        );
    }
}

const courseStyle = {
    color: '#444444',
    background: '#F3F3F3',
    border: '1px #DADADA solid',
    padding: '5px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '9pt',
    outline: 'none',
    margin: '5px'
}

const btnStyle = {
    borderRadius:'50%', 
    float: 'right', 
    fontSize: '10px', 
    padding: '2px 5px', 
    height: '90%', 
    cursor: 'pointer'
}

export default CourseList;
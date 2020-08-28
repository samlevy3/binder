import React from 'react';

class CourseList extends React.Component {
    render() {
        const courseList = this.props.courses.map((course) => 
            <p key={course.name} style={courseStyle}>
                {course.name}
                <button
                    key={course.name}
                    style={btnStyle}
                    onClick={this.props.deleteCourse.bind(this, course.name)}
                >
                        X
                </button>
            </p>
        );
        return (
            <div style={{display: 'flex', flexDirection: 'row',height:'200px', margin: '10px', overflow: 'scroll', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                {courseList}
            </div>
        );
    }
}

const courseStyle = {
    color: '#444444',
    background: '#F3F3F3',
    border: '1px #DADADA solid',
    padding: '15px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '.9em',
    outline: 'none',
    margin: '5px',
    flex: '1',
}

const btnStyle = {
    borderRadius:'50%', 
    float: 'right', 
    fontSize: '10px', 
    padding: '2px 5px', 
    height: '90%', 
    cursor: 'pointer',
}

export default CourseList;

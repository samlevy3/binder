import React from 'react';

class CourseItem extends React.Component {
  
  render() {
      const courseName = this.props.courseName;
    return (
      <div style={{border: '1px solid gray'}}>
          {courseName}
          <input
            type="button"
            style={{borderRadius:'50%', background:'red', float: 'right'}}
            value="X"
            onClick={this.props.deleteCourse.bind(this, courseName)}
            ></input>
      </div>
      
    )
  }
}

export default CourseItem;

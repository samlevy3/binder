import React from 'react';

class CourseItem extends React.Component {
  
  render() {
      const courseName = this.props.courseName;
    return (
      <div style={{border: '1px solid gray', padding: '2px', margin: '5px', backgroundColor: '#EAE9E9', flex: '10'}}>
          {courseName}
          <input
            type="button"
            style={{borderRadius:'50%', background:'red', float: 'right', fontSize: '10px', padding: '2px 5px', height: '90%', cursor: 'pointer'}}
            value="X"
            onClick={this.props.deleteCourse.bind(this, courseName)}
            ></input>
      </div>
      
    )
  }
}

export default CourseItem;

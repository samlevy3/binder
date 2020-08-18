import React from 'react';

class CourseItem extends React.Component {
  
  render() {
      const courseName = this.props.courseName;
    return (
      <div style={{
        color: '#444444',
        background: '#F3F3F3',
        border: '1px #DADADA solid',
        padding: '5px 10px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '9pt',
        outline: 'none',
        margin: '5px'
    }}>
          {courseName}
          <input
            type="button"
            style={{borderRadius:'50%', float: 'right', fontSize: '10px', padding: '2px 5px', height: '90%', cursor: 'pointer'}}
            value="X"
            onClick={this.props.deleteCourse.bind(this, courseName)}
            ></input>
      </div>
      
    )
  }
}

export default CourseItem;

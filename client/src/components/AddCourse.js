import React from 'react';

class AddCourse extends React.Component {

    state = {
        title: ''
    }

    onClick = (e) => {
        e.preventDefault();
        if (this.validCourse()) {
            this.props.addCourse(this.state.title);
            this.setState({ title: ''});
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value.toUpperCase() });


    validCourse = () => {
        const title = this.state.title;

        //Check syntax of course name here
        return title !== '';
    }

  render() {
    return (
        <div style={{display: 'flex'}}>
        <input 
              type="text" 
            name="title"
            style={{flex: '10', padding: '5px', fontSize: '12px', width: '80px'}}
            placeholder="New Course ..."
            value={this.state.title}
            onChange={this.onChange}
        />
        <input 
            type="button"
            onClick={this.onClick}
            value="Add Course"
            className="btn"
            style={{ fontSize: '12px'}}
        />
    </div>
    )
  }
}

export default AddCourse;
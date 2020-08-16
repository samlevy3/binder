import React from 'react';
import AddCourse from './AddCourse';
import CourseList from './CourseList';

class NewUser extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '',
        courses: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.inputsFilled()) {
            console.log(this.state);
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    
    inputsFilled = () => {
        return !(this.state.name === '' || this.state.email === '' || this.state.phone === '');
    }

    addCourse = (course) => {
        let courses = this.state.courses;
        courses.push(course);
        this.setState({courses});
    }

    deleteCourse = (course) => {
        this.setState({ courses : [...this.state.courses.filter( c => c !== course)]})
    }

  render() {
    return (
      <div style={{padding: '10px'}}>
        New User! Sign up now!
        <form onSubmit={this.onSubmit} style={{display: 'flex'}}>
            <ul style={{listStyleType: 'none', padding: '10px'}}>
                <li>
                <input 
			  		type="text" 
					name="name"
					style={{flex: '10', padding: '5px'}}
					placeholder="Name"
					value={this.state.name}
					onChange={this.onChange}
				/>
                </li>
                <li>
                <input 
			  		type="email" 
					name="email"
					style={{flex: '10', padding: '5px'}}
					placeholder="Email"
					value={this.state.email}
					onChange={this.onChange}
				/>
                </li>
                <li>
                <input 
			  		type="tel" 
					name="phone"
					style={{flex: '10', padding: '5px'}}
					placeholder="Phone"
					value={this.state.phone}
					onChange={this.onChange}
				/>
                </li>
                <li>
                    <CourseList courses={this.state.courses} deleteCourse={this.deleteCourse}/>
                </li>
                <li>
                    <AddCourse addCourse={this.addCourse}/>
                </li>
				<input 
					type="submit"
					value="Submit"
					className="btn"
					style={{flex: '1'}}
				/></ul>
			</form>
      </div>
    )
  }
}

export default NewUser;

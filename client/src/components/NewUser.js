import React from 'react';
import AddCourse from './AddCourse';
import CourseList from './CourseList';

class NewUser extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        courses: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, password, courses} = this.state;
        if (!name || !email || !phone || !password || !courses) {
            alert("Please enter all fields")
        }
        this.props.register(name, email, password, phone, courses);
        this.setState({ name: '',
        email: '',
        phone: '',
        password: '',
        courses: []});
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
                <input 
			  		type="password" 
					name="password"
					style={{flex: '10', padding: '5px'}}
					placeholder="Password"
					value={this.state.password}
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
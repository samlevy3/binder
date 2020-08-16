import React from 'react';
import AddCourse from './AddCourse';
import CourseList from './CourseList';

class NewUser extends React.Component {

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: '',
        courses: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, password, confirm_password, courses} = this.state;
        if (!name || !email || !phone || !password || !confirm_password || courses.length === 0) {
            alert("Please enter all fields.")
        }
        else if (password !== confirm_password) {
            alert("Passwords do not match.")
        } else {
            this.props.register(name, email, password, phone, courses);
            this.setState({ name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            courses: []});
        }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    addCourse = (course) => {
        let courseObject = {
            name: course,
            inGroup: false,
        }
        let courses = this.state.courses;
        courses.push(courseObject);
        this.setState({courses});
    }

    deleteCourse = (course) => {
        this.setState({ courses : [...this.state.courses.filter( c => c.name !== course)]})
    }

  render() {
    return (
    <div style={{textAlign: 'center', padding: '10px'}}>
        <h2>
        Create New Account
        </h2> 
      <div style={{padding: '10px'}}>
        <form onSubmit={this.onSubmit} style={{display: 'block', width: '45%', float:'left'}}>
                <input 
			  		type="text" 
					name="name"
					style={formStyle}
					placeholder="Name"
					value={this.state.name}
					onChange={this.onChange}
				/>
                <input 
			  		type="email" 
					name="email"
					style={formStyle}
					placeholder="Email"
					value={this.state.email}
					onChange={this.onChange}
				/>
                <input 
			  		type="tel" 
					name="phone"
					style={formStyle}
					placeholder="Phone"
					value={this.state.phone}
					onChange={this.onChange}
				/>
                <input 
			  		type="password" 
					name="password"
					style={formStyle}
					placeholder="Password"
					value={this.state.password}
					onChange={this.onChange}
				/>
                <input 
			  		type="password" 
					name="confirm_password"
					style={formStyle}
					placeholder="Confirm Password"
					value={this.state.confirm_password}
					onChange={this.onChange}
				/>
				<input 
					type="submit"
					value="Submit"
					className="btn"
					style={{flex: '1', float: 'right'}}
				/>
			</form>
      </div>
      <div style={{
                float: 'right', 
                width: '35%', 
                height: '55%', 
                border: '1px solid black', 
                padding: '10px',
                borderRadius: '4px',
                backgroundColor: '#ccc',
                margin: '0% 10% 2% 2%',

        }}> <p>
                {this.state.courses.length === 0 ? 'No courses added' : undefined}
            </p>
            <CourseList courses={this.state.courses} deleteCourse={this.deleteCourse}/>
            <AddCourse addCourse={this.addCourse}/>
    </div>
    </div>
      
    )
  }
}

const formStyle = {
    width: '100%',
    padding: '12px 20px',
    margin: '8px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
}

export default NewUser;
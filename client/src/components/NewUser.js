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
        courses: [],
        courseList: [],
        isSearching: false
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
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].name === courseObject.name) {
                return alert('Cannot have duplicate classes');
            }
        }
        courses.push(courseObject);
        this.setState({courses, courseList: [...this.state.courseList.filter(c => c !== course)]});
    }

    displayCourses = (courses, inputLength) => {
        this.setState({courseList: courses, isSearching: inputLength > 0});
    }

    deleteCourse = (course) => {
        this.setState({ courses : [...this.state.courses.filter( c => c.name !== course)], courseList: [...this.state.courseList, course]})
    }

  render() {
    return (
    <div style={{textAlign: 'center', padding: '10px'}}>
        <h2 style={{color: '#4b2e83', fontWeight: 'bold', fontSize: '1.5em'}}>
        Create New Account
        </h2> 
      <div style={{padding: '20px', marginLeft: '20px'}}>
        <form onSubmit={this.onSubmit} style={{textAlign: 'left'}}>
                Name: 
                <input 
			  		type="text" 
					name="name"
					style={formStyle}
					placeholder="Name"
					value={this.state.name}
					onChange={this.onChange}
				/>
                Please Enter Valid UW Email Address: 
                <input 
			  		type="email" 
					name="email"
					style={formStyle}
					placeholder="Email"
					value={this.state.email}
					onChange={this.onChange}
				/>
                Phone Number: 
                <input 
			  		type="tel" 
					name="phone"
					style={formStyle}
					placeholder="Phone"
					value={this.state.phone}
					onChange={this.onChange}
				/>
                Password:
                <input 
			  		type="password" 
					name="password"
					style={formStyle}
					placeholder="Password"
					value={this.state.password}
					onChange={this.onChange}
				/>
                Confirm Password:
                <input 
			  		type="password" 
					name="confirm_password"
					style={formStyle}
					placeholder="Confirm Password"
					value={this.state.confirm_password}
					onChange={this.onChange}
				/>
                <div style={{
                    height: '55%', 
                    border: '1px solid black', 
                    padding: '10px',
                    borderRadius: '4px',
                    backgroundColor: '#4b2e83',
                    margin: 'auto',
                    color: 'rgb(255, 255, 255)', 
                    fontWeight: 'bold',
                    fontSize: '1.2em',
                    textAlign: 'Center'
                }}>     
                    {this.state.courses.length === 0 ? 'No courses added' : undefined}
                        <CourseList courses={this.state.courses} deleteCourse={this.deleteCourse}/>
                        <AddCourse displayCourses={this.displayCourses} addCourse={this.addCourse}/>
                        { this.state.isSearching ?
                            <div style={{  
                                backgroundColor: '#4b2e83',
                                position: 'sticky', 
                                width: '100%', 
                                border: '1px solid black', 
                                borderRadius: '4px',
                                marginTop: '1%',
                                right: '10.2%',
                                overflow: 'scroll',
                                height: '20vh'
                            }}>
                                {this.state.courseList.map(
                                    course => 
                                    <button 
                                        key={course}
                                        style={searchStyle}
                                        onClick={this.addCourse.bind(this, course)}
                                    >
                                        {course}
                                    </button>
                                )}
                            </div> : 
                            null
                        }
                </div>
				<input 
					type="submit"
					value="Submit"
					className="btn"
					style={{marginTop: '10px', width: '30%', backgroundColor: '#4b2e83', color: 'white', borderRadius: '12px', padding: '10px', fontSize: '1.2em'}}
				/>
			</form>
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
    border: '1px solid rgb(75, 46, 131)',
    borderRadius: '4px',
    boxSizing: 'border-box',
}

const searchStyle = {
    color: 'white',
    background: '#4b2e83',
    border: '2px #DADADA solid',
    padding: '5px 10px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '.7em',
    outline: 'none',
    margin: '5px',
}

export default NewUser;

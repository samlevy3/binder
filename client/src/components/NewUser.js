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
        <h2 style={{color: 'rgb(75, 46, 131)', fontWeight: 'bold', fontSize: '1.5em'}}>
        Create New Account
        </h2> 
      <div style={{padding: '20px', marginLeft: '20px'}}>
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
					style={{flex: '1', width: '30%', backgroundColor: 'rgb(75, 46, 131)', color: 'white', borderRadius: '12px', padding: '10px', fontSize: '1.2em'}}
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
                backgroundColor: 'rgb(75, 46, 131)',
                margin: '0% 10% 2% 2%',
                color: 'rgb(255, 255, 255)', 
                fontWeight: 'bold',
                fontSize: '1.2em'
        }}>     
                {this.state.courses.length === 0 ? 'No courses added' : undefined}
            <CourseList courses={this.state.courses} deleteCourse={this.deleteCourse}/>
            <AddCourse displayCourses={this.displayCourses} addCourse={this.addCourse}/>
            { this.state.isSearching ? <div style={{   
                backgroundColor: 'rgb(75, 46, 131)',
                position: 'fixed', 
                width: '35%', 
                height: '20%',
                border: '1px solid black', 
                padding: '10px',
                borderRadius: '4px',
                marginTop: '1%',
                right: '10.2%',
                overflow: 'scroll'
            }}>
                {this.state.courseList.map(
                    course => 
                    <button 
                    style=
                    {{
                        color: '#444444',
                        background: '#F3F3F3',
                        border: '1px #DADADA solid',
                        padding: '5px 10px',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '9pt',
                        outline: 'none',
                        margin: '5px'
                    }}
                    onClick={this.addCourse.bind(this, course)}>
                            {course}
                    </button>
                )}
            </div> : null}
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
    boxSizing: 'border-box'
}

export default NewUser;
import React, {Component} from 'react';

class Course extends Component {
    render() {
        const name = this.props.course
        return (
            <div>
                <button onClick={this.props.courseClicked.bind(this, name)} >
                {name}
                </button>
            </div>
        );
    }
}

export default Course;
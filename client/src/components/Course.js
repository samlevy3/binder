import React, {Component} from 'react';


class Course extends Component {

    state = {
        clicked: false
    }
    render() {
        const name = this.props.course.name
        return (
            <div >
                <button onClick={this.props.courseClicked.bind(this, name)} style={btnStyle} >
                {name}
                </button>
            </div>
        );
    }
}

const btnStyle = {
    backgroundColor:  '#fff' ,
    border: "none",
    borderTop: "solid #4b2e83 1px",
    height: "100%",
    width: "100%",
    color: '#4b2e83',
    textAlign: "center",
    padding: "20px",
    fontSize: "1em",
    fontWeight: "bold"

}

export default Course;
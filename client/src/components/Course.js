import React, {Component} from 'react';


class Course extends Component {

    state = {
        clicked: false
    }
    render() {
        const name = this.props.course
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
    borderTop: "dashed #000 1px",
    height: "100%",
    width: "100%",
    textAlign: "center",
    padding: "20px"

}

export default Course;
import React, { PropTypes } from 'react';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';

class CoursePage extends React.Component {

  //Constructor that is responsible to initialize the state and call our bind functions
  constructor(props, context) {
    super(props, context);

    this.state={
      course: {title: " "}
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  // Child functions that will be called by Render Function
  onTitleChange(event){
    const course= this.state.course;
    course.title= event.target.value;
    this.setState({course: course});
  }

  onClickSave(){
    //this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course); // After calling a common method for all action the method comes under action
  }

  courseRow(course,index){
    return <div key={index}>{course.title}</div>;
  }

  // Render function where we can call our child components rather than calling the HTML marks ups directly
  render () {
    return (
      <div>
        <h1>Courses page!</h1>
        {this.props.courses.map(this.courseRow)}
        <h2>Add Course</h2>
        <input
        type="text"
        onChange={this.onTitleChange}
        value={this.state.course.title} />

        <input
        type="submit"
        value="Save"
        onClick={this.onClickSave}/>
      </div>
    );
  }
}

// PropTypes for propTypes validations
CoursePage.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions : PropTypes.object.isRequired
};

// Below all are Redux connect calls and methods
function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
     //createCourse: course => dispatch(courseActions.createCourse(course)) // calling dispatch for individual action
     actions: bindActionCreators(courseActions,dispatch) // Common to all action , Replaced the above call with bindActionCreators
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(CoursePage);
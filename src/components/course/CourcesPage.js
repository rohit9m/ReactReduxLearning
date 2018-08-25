import React, { PropTypes } from 'react';
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';
import {push} from 'react-router-redux';


class CoursePage extends React.Component {

  //Constructor that is responsible to initialize the state and call our bind functions
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
  }

  courseRow(course,index){
    return <div key={index}>{course.title}</div>;
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  // Render function where we can call our child components rather than calling the HTML marks ups directly
  render () {
    const {courses} = this.props;
    return (
      <div>
        <h1>Courses page!</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}/>
        <CourseList courses = {courses}/>
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
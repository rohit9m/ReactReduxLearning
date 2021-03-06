import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseAction';
import CourseForm from './CourseForm';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        course: Object.assign({}, this.props.course),
        errors: {},
        saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse=this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id !== nextProps.course.id) {
      // Necessary to update form when existing course is loading directly
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;
    this.setState({
      course: course
    });
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
        errors.title = 'Title must be at least 5 characters.';
        formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
}

  saveCourse(evt) {
    evt.preventDefault();
    
    if(!this.courseFormIsValid()){
      return;
    }
    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
     .then(() => this.redirect())
     .catch(error => {
       toastr.error(error);
       this.setState({saving: false});
     });
  }

  redirect(){
    this.setState({saving: false});
    toastr.success('course saved');
    this.context.router.push('/courses');
  }

  render() {
   return(
        <CourseForm 
            allAuthors={this.props.authors}
            onChange={this.updateCourseState}
            onSave={this.saveCourse}
            course={this.state.course} 
            errors={this.state.errors}
            saving={this.state.saving}
        />
   );
  }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context so router is available on this.context.router
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.find(course => course.id == id);
  if (course) return course; // Since Filter Returns an array, have to grab first element
  return null;
}

function mapStateToProps(state, ownProps) {
  const courseId = ownProps.params.id; // from the path '/course/:id' 
  let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  
  if (courseId && state.courses.length > 0) {
    course = getCourseById(state.courses, courseId);
  }

  return {
  course: course,
  authors: authorsFormattedForDropdown(state.authors)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
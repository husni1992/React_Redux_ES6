import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    courseRow(course, index) {
        return <div key={index}>{course.title}</div>;
    }

    render() {
        return (
            <div>
                <h1>Courses</h1>
                {/*{this.props.courses.map(this.courseRow)}*/}
                <CourseList courses={this.props.courses} />
            </div>
        );
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapSateToProps(state, ownProps) {
    return {
        courses: state.courses
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapSateToProps, mapDispatchToProps)(CoursesPage);
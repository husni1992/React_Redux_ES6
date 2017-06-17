import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';


class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, props.course),
            errors: {}
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.textChangeHandler = this.textChangeHandler.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course.id != nextProps.course.id) {
            // to populate course form when existing course is loaded directly
            this.setState({ course: Object.assign({}, nextProps.course) });
        }
    }

    textChangeHandler(evt) {
        return this.setState({
            course: {
                title: evt.target.value
            }
        });
        //This gives a warning, check why> warning.js?8a56:36 Warning: TextInput is changing a controlled input of type text to be uncontrolled. Input elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://fb.me/react-controlled-components
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        // courseActions.saveCourse(course);
        return this.setState({ course: course });
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        return (
            <div>
                <h1>Manage Course</h1>
                <CourseForm
                    course={this.state.course}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    allAuthors={this.props.authors}
                    errors={this.state.errors} />
            </div>
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

// Pull in the React Router context, so router is available on this.context.router.
ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);
    if (course.length) return course[0];
    return null;
}

function mapSateToProps(state, ownProps) {

    let courseId = ownProps.params.id; // from the path 'course/:id'

    let course = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    const authorsFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });

    return {
        course: course,
        authors: authorsFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapSateToProps, mapDispatchToProps)(ManageCoursePage);
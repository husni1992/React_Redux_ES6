import * as types from './actionTypes';

export function createCourse(course) {
    return { type: types.CREATE_COURSE, course: course };
}

export function deleteCourse(course) {
    return { type: 'DELETE_COURSE', course: course }
}
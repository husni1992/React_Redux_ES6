import * as type from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case type.LOAD_COURSES_SUCCESS:
            return action.courses;
            
        default: 
            return state;
    }
}
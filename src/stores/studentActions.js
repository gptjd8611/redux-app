import { ADD_STUDENT, DELETE_STUDENT, MARK_STUDENT } from './studentActionTypes';

export const addStudent = (name) => ({
    type: ADD_STUDENT,
    payload: { name },
});

export const deleteStudent = (id) => ({
    type: DELETE_STUDENT,
    payload: { id },
});

export const markStudent = (id) => ({
    type: MARK_STUDENT,
    payload: { id },
});

import { ADD_STUDENT, DELETE_STUDENT, MARK_STUDENT } from './studentActionTypes';

const initialState = {
    count: 0,
    students: [],
};

export const studentReducer = (state = initialState, action) => {

    const getAttendanceStatus = () => {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        if (hour < 9 || (hour === 9 && minute === 0)) {
            return '출석';
        } else if (hour < 10) {
            return '지각';
        } else {
            return '결석';
        }
    };

    switch (action.type) {
        case ADD_STUDENT:
            const newStudent = {
                id: Date.now(),
                name: action.payload.name,
                status: getAttendanceStatus(),  // 출석 상태 자동 설정
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })  // ex: 09:30
            };
            return {
                count: state.count + 1,
                students: [...state.students, newStudent],
            };

        case DELETE_STUDENT:
            return {
                count: state.count - 1,
                students: state.students.filter((student) => student.id !== action.payload.id),
            };

        case MARK_STUDENT:
            return {
                count: state.count,
                students: state.students.map((student) =>
                    student.id === action.payload.id
                        ? { ...student, isHere: !student.isHere }
                        : student
                ),
            };

        default:
            return state;
    }
};

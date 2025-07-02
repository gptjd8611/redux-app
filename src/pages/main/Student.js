import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteStudent, markStudent } from '../../stores/studentActions';

const Student = ({ name, id, status,time }) => {
    const dispatch = useDispatch();

    return (
        <div>
            <ul className="list-wrap">
                <li>


                    <span className={`status-badge ${status}`}>
                    {status}
                    </span>
                    <p className="desc name"> {name}</p>
                    <p className="desc "> {time}</p>
                    <button type={"button"} className="btn-del" onClick={() => dispatch(deleteStudent(id))}>삭제</button>
                </li>

            </ul>



        </div>
    );
};

export default Student;

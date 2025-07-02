import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Student from './Student';
import { addStudent } from '../../stores/studentActions';

const StudentList = () => {
    const [name, setName] = useState('');
    // Redux 상태 가져오기 – 학생 정보
    const studentsInfo = useSelector((state) => state.student);//state는 Redux 스토어 전체 상태 트리
    // Redux 스토어에서 studentReducer의 상태를 가져옴
    // students가 undefined일 경우를 대비해 빈 배열로 대체
    const students = studentsInfo?.students || [];
    //Redux 액션 호출 준비(액션을 Redux로 보내기 위한 함수)
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체'); // 전체, 출석, 지각, 결석

    const filteredStudents = students.filter((student) => {
        const nameMatch = student.name.includes(searchTerm);
        const statusMatch = statusFilter === '전체' || student.status === statusFilter;
        return nameMatch && statusMatch;
    });

    const total = students.length;
    const attend = students.filter((s) => s.status === '출석').length;
    const late = students.filter((s) => s.status === '지각').length;
    const absent = students.filter((s) => s.status === '결석').length;

    const getPercent = (count) => (total > 0 ? ((count / total) * 100).toFixed(1) : 0);


    return (
        <div className="container">
            <div className="flex-box">

                <p className="s-tit">총 학생수: <strong>{studentsInfo.count}</strong></p>
                    <div className="flex-box">
                <input
                    type="text"
                    placeholder="이름을 입력해주세요."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                />
                <button
                    onClick={() => {
                        dispatch(addStudent(name));
                        setName('');
                    }}
                    className="btn-add"
                >
                    추가
                </button>
                </div>
            </div>


            <div className="progress-wrap">
                <div className="progress-bar">
                    <p className="label">출석 <span>{getPercent(attend)}<strong>%</strong></span></p>
                    <div className="bar">
                        <div className="fill attend" style={{ width: `${getPercent(attend)}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <p className="label">지각 <span>{getPercent(late)}<strong>%</strong></span></p>
                    <div className="bar">
                        <div className="fill late" style={{ width: `${getPercent(late)}%` }}></div>
                    </div>
                </div>
                <div className="progress-bar">
                    <p className="label">결석 <span>{getPercent(absent)}<strong>%</strong></span></p>
                    <div className="bar">
                        <div className="fill absent" style={{ width: `${getPercent(absent)}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="list-box">
                <div className="flex-box list-box__tit">
                    <p className="title">학생 리스트</p>
                    <div className="search-filter-box">
                        <input
                            type="text"
                            placeholder="이름 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input"
                        />

                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                                className="form-select"
                        >
                            <option value="전체">전체</option>
                            <option value="출석">출석</option>
                            <option value="지각">지각</option>
                            <option value="결석">결석</option>
                        </select>
                    </div>
                </div>
                {filteredStudents.length === 0 ? (
                <div className="no-data">
                    <p>검색결과가 없습니다.</p>
                </div>) : (
                    filteredStudents.map((student) => (
                <Student
                    key={student.id}
                    id={student.id}
                    name={student.name}
                    status={student.status}
                    time={student.time}
                />
            ))
                    )}
            </div>
        </div>
    );
};

export default StudentList;

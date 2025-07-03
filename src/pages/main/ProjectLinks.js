import { Link } from 'react-router-dom';
import Bank from '../../assets/images/bank.svg'
import Student from '../../assets/images/student.svg'
const ProjectLinks = () => {
    return (


        <div className="container">
            <div className="project-grid">
            <Link to="/attendance" className="project-card">
                <p className="project-card-ico"><img src={Student} alt=""/></p>
                <h3 className="project-card-tit"> 학생 출석부</h3>
                <p className="project-card-desc">학생 정보를 추가하고 출석, 지각, 결석을 자동 판별하는 출석 관리 기능입니다.</p>
            </Link>

            <Link to="/banking" className="project-card">
                <p className="project-card-ico"><img src={Bank} alt=""/></p>

                <h3 className="project-card-tit"> 입출금 가계부</h3>
                <p className="project-card-desc">잔고 관리, 거래 내역, 통계까지 지원하는 간단한 Redux 기반 가계부 기능입니다.</p>

            </Link>
            </div>
        </div>
    );
};

export default ProjectLinks;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deposit, withdraw,deleteTransaction } from '../../stores/actions';
import { isToday, isThisWeek, isThisMonth } from '../../utils/dateFilter';
export const ReducerExView = () => {
    const [number, setNumber] = useState(0);
    const [memo, setMemo] = useState('');
    const [date, setDate] = useState('');
    const [filter, setFilter] = useState('all');

    const money = useSelector((state) => state.money.money); // Redux 상태 접근
    const transactions = useSelector((state) => state.money.transactions);
    const dispatch = useDispatch();

    const handleDeposit = () => {
        if (!number || !date) return alert('금액과 날짜를 입력해주세요');
        dispatch(deposit(number, memo, date));
        setNumber('');
        setMemo('');
        setDate('');
    };
    const handleWithdraw = () => {
        if (!number || !date) return alert('금액과 날짜를 입력해주세요');
        dispatch(withdraw(number, memo, date));
        setNumber('');
        setMemo('');
        setDate('');
        if (number > money) {
            alert("잔고가 부족합니다.");
            return;
        }
    };

    const filteredTransactions = transactions.filter((tx) => {
        if (filter === 'today') return isToday(tx.date);
        if (filter === 'week') return isThisWeek(tx.date);
        if (filter === 'month') return isThisMonth(tx.date);
        return true; // 'all'
    });

    const deleteTransaction = ()=>{
        if (window.confirm('정말 삭제하시겠습니까?')) {
            dispatch(deleteTransaction(tx.id));
        }
    }


    return (
        <div className="container">
            <h2 className="s-tit">현재 잔고: <strong>{money}</strong>원</h2>
            <div className="flex-box">
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(parseInt(e.target.value))}
                step="1000"
                min="1000"
                className="form-input"
            />

            <input type="date"  value={date} className="form-input" onChange={(e) => setDate(e.target.value)}/>
            <input type="text" value={memo} onChange={(e) => setMemo(e.target.value)}  className="form-input" placeholder="메모"/>
            </div>
            <div className="btn-box">
            <button
                onClick={handleDeposit}
                className="btn-deposit"
            >
                입금
            </button>
            <button
                onClick={handleWithdraw}
                className="btn-withdraw"
            >
                출금
            </button>
            </div>
            <div className="list-box">
                <div className="flex-box list-box__tit">

                <p className="title">거래 내역</p>
                <select onChange={(e) => setFilter(e.target.value)} className="form-select">
                    <option value="all">전체</option>
                    <option value="today">오늘</option>
                    <option value="week">이번 주</option>
                    <option value="month">이번 달</option>
                </select>
                </div>

                <ul className="list-wrap">
                    {transactions.length === 0 ? (
                        <div className="no-data">
                            <p>현재 거래내역이 없습니다.</p>
                        </div>
                    ) : (
                        filteredTransactions.map((tx) => (
                            <li key={tx.id}>
                                <p className={`${tx.type} status`}>
                                    {tx.type === 'deposit' ? '입금' : '출금'}
                                </p>
                                <p className={`price ${tx.type === 'deposit' ? 'plus' : 'minus'}`}>
                                    {tx.type === 'deposit' ? '+' : '-'}
                                    {tx.amount.toLocaleString()}
                                </p>
                                <p className="desc">{tx.memo || '-'}</p>
                                <p className="desc">{tx.date}</p>

                                <button
                                    className="btn-del"
                                    onClick={deleteTransaction}
                                >
                                    삭제
                                </button>
                            </li>
                    ))
                        )}
                </ul>
            </div>
            {/*<div className="list-box">*/}
            {/*    <div className="flex-box">*/}

            {/*      <p className="title">학생 리스트</p>*/}
            {/*        <div className="sch-box">*/}
            {/*            <input type="text" placeholder="이름"/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <ul className="list-wrap">*/}
            {/*        <li>*/}
            {/*            <button className="deposit status">입금</button>*/}
            {/*            <button className="withdraw status">출금</button>*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*</div>*/}


        </div>
    );
}
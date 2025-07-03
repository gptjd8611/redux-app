// reducer.js
import { DEPOSIT, WITHDRAW,DELETE_TRANSACTION  } from './actionTypes';

const initialState = {
    money: 0,
    transactions: [],
};

export const moneyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DEPOSIT': {
            const newTransaction = {
                id: Date.now(),
                type: 'deposit',
                amount: action.payload.amount,
                memo: action.payload.memo,
                date: action.payload.date,
            };
            return {
                ...state,
                money: state.money + action.payload.amount,
                transactions: [newTransaction, ...state.transactions],
            };
        }

        case 'WITHDRAW': {
            const newTransaction = {
                id: Date.now(),
                type: 'withdraw',
                amount: action.payload.amount,
                memo: action.payload.memo,
                date: action.payload.date,
            };
            return {
                ...state,
                money: state.money - action.payload.amount,
                transactions: [newTransaction, ...state.transactions], // ✅ 출금 내역 추가
            };
        }


        case DELETE_TRANSACTION: {
            const deletedTx = state.transactions.find(tx => tx.id === action.payload);
            if (!deletedTx) return state;

            const updatedMoney =
                deletedTx.type === 'deposit'
                    ? state.money - deletedTx.amount
                    : state.money + deletedTx.amount;

            return {
                ...state,
                money: updatedMoney,
                transactions: state.transactions.filter(tx => tx.id !== action.payload) // ✅ .id 제거
            };
        }

        default:
            return state;
    }
};
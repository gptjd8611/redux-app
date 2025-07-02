// actions.js
import { DEPOSIT, WITHDRAW,DELETE_TRANSACTION } from './actionTypes';

export const deposit = (amount, memo, date) => ({
    type: DEPOSIT,
    payload: { amount, memo, date },
});

export const withdraw = (amount, memo, date) => ({
    type: WITHDRAW,
    payload: { amount, memo, date },
});

export const deleteTransaction = (id) => ({
    type: DELETE_TRANSACTION,
    payload: id,
});
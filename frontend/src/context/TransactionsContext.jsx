/* eslint-disable react-refresh/only-export-components */
import { useState,useEffect,createContext } from "react";
export const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {

    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem("transactions");
        return stored ? JSON.parse(stored) : [];
    });

    const addTransaction = (newTxn) => {
        setTransactions(prev => [...prev, newTxn]);
    };

    const editTransaction = (updatedTxn) => {
    setTransactions(prev =>
        prev.map(txn =>
        txn.id === updatedTxn.id ? { ...txn, ...updatedTxn } : txn
        )
      );
    };

    const deleteTransaction = (id) => {
        setTransactions(prev =>
            prev.filter(txn => txn.id !== id)
        );
    };

    useEffect(()=>{
        localStorage.setItem("transactions", JSON.stringify(transactions));
    },[transactions]);

    return (
    <TransactionsContext.Provider value={{transactions, addTransaction, editTransaction, deleteTransaction}}>
        {children}
    </TransactionsContext.Provider>
    )
};

export default TransactionsProvider 
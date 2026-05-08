//* eslint-disable react-hooks/exhaustive-deps */
//* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { useState,useEffect,createContext } from "react";
import axios from "axios";
export const TransactionsContext = createContext();

const TransactionsProvider = ({ children }) => {

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        if(token){
            try {
                const response = await axios.get("http://localhost:4000/api/transaction", {headers:{token}});
                if(response.data.success){
                    setTransactions(response.data.transactions);
                }     
            }
             catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(()=>{
        fetchTransactions();
    },[]);

    const addTransaction = async (newTxn) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://localhost:4000/api/transaction",newTxn,{headers:{token}})
            if(response.data.success){
                fetchTransactions()
            }
        } 
        catch (error) {
            console.log(error)
        }
    };

    const editTransaction = async (updatedTxn) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(`http://localhost:4000/api/transaction/${updatedTxn._id}`,updatedTxn,{headers:{token}})
            if(response.data.success){
                fetchTransactions()
            }
        } 
        catch (error) {
            console.log(error)
        }
    };

    const deleteTransaction = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:4000/api/transaction/${id}`,{headers:{token}})
            if(response.data.success){
                fetchTransactions()
            }
        } 
        catch (error) {
            console.log(error)
        }
    };

    return (
    <TransactionsContext.Provider value={{transactions, addTransaction, editTransaction, deleteTransaction, fetchTransactions}}>
        {children}
    </TransactionsContext.Provider>
    )
};

export default TransactionsProvider 
import React from "react";
import ReactDom from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import styles from "../styles/Home.module.css";

function Transaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const accountid = localStorage.getItem("accountid");

    axios.get(`http://localhost:3001/transactions/${accountid}`).then((response) => {

      const data = response.data;
      console.log(data)
      setTransactions(data);
      console.log(data)
      localStorage.removeItem("accountid");

    });

  }, []);

  const Thedata = transactions.map((trans, index) => {
    return (
      <tbody>
        <tr key={trans._id}>
          <td>{index}</td>
          <td>{trans.transactionId}</td>
          <td>{trans.date}</td>
          <td>{trans.amount > 0 ? "Deposit = $" : "Withdrawal = $"}
            {trans.amount}</td>
          <td>{trans.debitorId}</td>
          <td>{trans.creditorId}</td>        
          <td>{trans.accountid}</td>
        </tr>
      </tbody>
    )
  })

  return (
    <div   >
      <h1>Transactions</h1>
      <button onClick={() => { window.location.replace("http://localhost:3000/internal") }} href="/" >Internal Transfer</button>
      <button onClick={() => { window.location.replace("http://localhost:3000/external") }} href="/" >external Transfer</button>
      <Table >

        <thead>
          < tr >
            <th>#</th>
            <th>creditorId</th>
            <th>debitorId</th>
            <th>amout</th>
            <th>date</th>
            <th>tracid</th>
            <th>accountid</th>
          </tr>
        </thead>
        {Thedata}

      </Table>
    </div >
  );
}

export default Transaction;
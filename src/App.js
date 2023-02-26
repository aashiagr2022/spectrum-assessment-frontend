import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewardPoints, setMonthlyRewardPoints] = useState({});
  const [totalRewardPoints, setTotalRewardPoints] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:9000/transactions");
      const { transactions, monthlyRewardPoints, totalRewardPoints } = response.data;
      setTransactions(transactions);
      setMonthlyRewardPoints(monthlyRewardPoints);
      setTotalRewardPoints(totalRewardPoints);
    }

    fetchData();
  }, []);
  const cellStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center'
  };
  return (
    <div className="App">
    <div style={{ textAlign: 'center' }}>
    <h1>Transactions</h1>
    </div>

    <div style={{ textAlign: 'center' }}>
    <h2>Monthly Reward Points</h2>
    </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={cellStyle}>Customer Name</th>
          <th style={cellStyle}>December 2022</th>
          <th style={cellStyle}>January 2023</th>
          <th style={cellStyle}>February 2023</th>
          <th style={cellStyle}>Total</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(monthlyRewardPoints).map((custName, index) => {
          const decPoints = monthlyRewardPoints[custName]['December 2022'] || 0;
          const janPoints = monthlyRewardPoints[custName]['January 2023'] || 0;
          const febPoints = monthlyRewardPoints[custName]['February 2023'] || 0;
          const totalPoints = decPoints + janPoints + febPoints;
          return (
            <React.Fragment key={index}>
              <tr>
                <td style={cellStyle}>{custName}</td>
                <td style={cellStyle}>{decPoints}</td>
                <td style={cellStyle}>{janPoints}</td>
                <td style={cellStyle}>{febPoints}</td>
                <td style={cellStyle}>{totalPoints}</td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>

    </div>
  );
}

export default App;

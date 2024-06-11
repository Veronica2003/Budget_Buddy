import './App.css';
import { useEffect, useState } from 'react';
import DoughnutChart from './Doughnut'; // Import the DoughnutChart component
import LineChartWithPrediction from './LineChartWithPrediction'; // Import the LineChartWithPrediction component

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(transactions => {
      console.log('Fetched transactions:', transactions); // Log fetched transactions
      setTransactions(transactions);
    });
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  async function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = parseFloat(name.split(' ')[0]); // Ensure price is a number
    const newTransaction = {
      price,
      name: name.substring(price.toString().length + 1),
      description,
      datetime,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
      const json = await response.json();
      setTransactions((prevTransactions) => [...prevTransactions, json]);
      setName('');
      setDatetime('');
      setDescription('');
      console.log('result', json); // Log result of adding a new transaction
      
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function deleteTransaction(id) {
    console.log('Deleting transaction with id:', id); // Log the id of the transaction to be deleted
    const url = `${process.env.REACT_APP_API_URL}/transactions/${id}`;
    try {
      await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction._id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  let balance = 0;
  for (let x = 0; x < transactions.length; x++) {
    balance = balance + transactions[x].price;
  }
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    
    <main>
      <h1>Rs.{balance}<span>{fraction}</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder={'Enter amount and name'}
          />
          <input
            value={datetime}
            onChange={(ev) => setDatetime(ev.target.value)}
            type="datetime-local"
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder={'Description'}
          />
        </div>
        <div>
          <button type="submit">Add New Transaction</button>
        </div>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map((transaction) => (
          <div key={transaction._id} className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? "red" : "green")}>Rs.{transaction.price}</div>
              <div className="datetime">{transaction.datetime}</div>
              <button onClick={() => deleteTransaction(transaction._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <DoughnutChart transactions={transactions} /> {/* Render the DoughnutChart component */}
      <LineChartWithPrediction transactions={transactions} />
    </main>
  );
}

export default App;

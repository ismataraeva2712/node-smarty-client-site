import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const handleSubmit = event => {
    event.preventDefault()
    const name = event.target.name.value
    const email = event.target.email.value
    const user = { name, email }
    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)

        console.log('Success:', data);
      })
  }
  return (
    <div className="App">
      <h2>{users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='name' id="" />
        <input type="email" name="email" placeholder='email' id="" />
        <input type="submit" value="add user" />
      </form>
      {
        users.map(user => <li key={user.id}>{user.name} </li>)
      }

    </div>
  );
}

export default App;

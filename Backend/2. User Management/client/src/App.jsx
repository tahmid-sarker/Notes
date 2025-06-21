import "./App.css"
import Users from "./components/Users";

const usersPromise = fetch('http://localhost:3000/users/').then(res => res.json())

const App = () => {
  return (
    <div>
      <h1>User Management Application</h1>
      <Users usersPromise={usersPromise}></Users>
    </div>
  );
};

export default App;
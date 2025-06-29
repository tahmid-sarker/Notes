import "./../App.css"
import Users from "./Users";

const usersPromise = fetch('http://localhost:3000/users/').then(res => res.json())

const Home = () => {
  return (
    <div>
      <h1>CURD Operation</h1>
      <Users usersPromise={usersPromise}></Users>
    </div>
  );
};

export default Home;
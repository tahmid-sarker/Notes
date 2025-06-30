import { useState } from 'react';
import { use } from 'react';
import { Link } from 'react-router';

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise);
    // console.log(initialUsers)
    const [users, setUsers] = useState(initialUsers)

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = { name, email }
        // console.log(newUser)

        // Create user in Database:
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(newUser),
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                // Add users to list
                newUser._id = data.insertedId;
                const newUsers = [...users, newUser];
                setUsers(newUsers);
                alert("User Added Successfully.")
                e.target.reset();
            }
        })
    }

    // Delete a user
    const handleDelete = (id) => {
        console.log("Selected id: ", id);
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log("After deleting data: ", data)
            if(data.deletedCount) {
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            }
        })
    }
    return (
        <div>
            <h3>Total users: {users.length}</h3>
            <div>
                {/*Add users*/}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Add your Name" />
                    <br />
                    <input type="email" name="email" placeholder="Add your Email" />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <div>
                {
                    users.map(user => 
                    <p key={user._id}>{user.name} : {user.email}
                    <Link to={`/details/${user._id}`} style={{padding: "4px"}}>Details</Link>
                    <Link to={`/update/${user._id}`} style={{padding: "4px"}}>Update</Link>
                    <button onClick={() => handleDelete(user._id)}>X</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;
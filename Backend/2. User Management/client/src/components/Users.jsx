import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
    const initialUsers = use(usersPromise)
    // console.log(users)
    const [users, setUsers] = useState(initialUsers);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email }
        // console.log(user)

        // Create a user in the server
        fetch('http://localhost:3000/users/', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Data after the post: ", data);
            const newArray = [...users, data];
            setUsers(newArray);
            e.target.reset(); // Form reset
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Add your Name" />
                <br />
                <input type="email" name="email" placeholder="Add your Email" />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <ul>
                {users.map(user => <li key={user.id}>{user.name}: {user.email}</li>)}
            </ul>
        </div>
    );
};

export default Users;
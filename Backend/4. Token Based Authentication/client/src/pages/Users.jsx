import { useEffect } from "react";
import { getUser } from "../api/userAPI";
import { useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUser()
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);
    
    return (
        <div>
            <h1 className="text-4xl font-semibold">Users Data: {users.length}</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id} className="my-2 p-2 border rounded">
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
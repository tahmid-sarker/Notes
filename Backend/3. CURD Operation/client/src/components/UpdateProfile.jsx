import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateProfile = () => {
    const user = useLoaderData();
    console.log(user);

    const handleUpdate = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = { name, email }
        console.log(updatedUser)

        // Update user Data:
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount) {
                // Add users to list
                // updatedUser._id = data.insertedId;
                // const updatedUsers = [...users, updatedUser];
                // setUsers(updatedUsers);
                console.log("After Update:", data)
            }
        })
    }
    return (
        <div>
            <div>
                {/*Add users*/}
                <form onSubmit={handleUpdate}>
                    <input type="text" name="name" placeholder="Add your Name" preventDefault={user.name} />
                    <br />
                    <input type="email" name="email" placeholder="Add your Email" preventDefault={user.email} />
                    <br />
                    <input type="submit" value="Update Value" />
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
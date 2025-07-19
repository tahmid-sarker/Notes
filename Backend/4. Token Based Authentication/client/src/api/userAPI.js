export const getUser = async() => {
    const res = await fetch('http://localhost:3000/users', {
        credentials: 'include', // Include credentials for cookie-based auth
    })
    return res.json();
};
// export const getQuotes = (accessToken) => {
export const getQuotes = (idToken) => {
    return fetch('http://localhost:3000/quotes', {
        headers: {
            authorization: `Bearer ${idToken}` // Use the JWT token for authorization
        }
    })
    .then(res => res.json());
}
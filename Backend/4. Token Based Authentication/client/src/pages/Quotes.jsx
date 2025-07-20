import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { getQuotes } from '../api/quoteAPI';
import { useState } from 'react';

const Quotes = () => {
    const { user } = useAuth(); 
    // console.log(user.accessToken); // Access the JWT token from the user object
    // console.log(user.getIdToken());
    const [quotes, setQuotes] = useState([]);
    // const accessToken = user.accessToken; // Get the JWT token from the user object
    
    useEffect(() => {
        // getQuotes(accessToken)
        //     .then(data => setQuotes(data))
        //     .catch(error => console.error("Error fetching quotes:", error));

        user.getIdToken()
            .then(idToken =>  getQuotes(idToken)) // Use the getIdToken method to get the JWT token
            .then(data => setQuotes(data))
            .catch(error => console.error("Error fetching quotes:", error));

    }, [])

    return (
        <div>
            <h1 className="text-4xl font-semibold">Quotes Data: {quotes.length}</h1>
            <ul>
                {quotes.map(quote => (
                    <li key={quote.id} className="my-2 p-2 border rounded">
                        {quote.text}
                    </li>
                ))}
            </ul>        
        </div>
    );
};

export default Quotes;
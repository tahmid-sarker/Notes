import { useLoaderData } from 'react-router';

const Phone = () => {
    const phone = useLoaderData();
    console.log(phone)
    return (
        <div>
            <p>{phone.name}</p>
            <img src={phone.image} alt={phone.name} />
        </div>
    );
};

export default Phone;
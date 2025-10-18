import Link from "next/link";

// SSR - Server Side Rendering
export const metadata = {
  title: "User Details",
  description: "User Details loaded from JSONPlaceholder API",
};

export const getUser = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    const data = res.json()
    return data
}

export default async function User({params}) {
    const { id } = await params;
    const user = await getUser(id);
  return (
    <section>
      {/* <code>{JSON.stringify(user)}</code> */}
      <h1>User Details Page: {id}</h1>
      {/* User Details */}
      <div className="mt-4 p-4 border border-gray-300 rounded">
        <h2 className="text-xl font-bold mb-2">{user.name}</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
        <p><strong>Address:</strong> {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p>
        <p><strong>Catch Phrase:</strong> {user.company.catchPhrase}</p>
        <p><strong>BS:</strong> {user.company.bs}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> <Link href={`${user.website}`}>{user.website}</Link></p>
      </div>
    </section>
  )
}
// SSR - Server Side Rendering
import Link from "next/link";
import styles from "./user.module.css";

export const metadata = {
  title: "All Users",
  description: "Users loaded from JSONPlaceholder API",
};

export const getUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = res.json();
  return data;
};

export default async function Users() {
  const users = await getUsers();

  return (
    <section>
      {/* <code>{JSON.stringify(users)}</code> */}
      <h1 className={styles["red-text"]}>Total Users: {users.length}</h1> 
      {/* You can use styles.redText as well but with bracket notation it works with hyphenated(-) class names */}
      {users.map((user) => (
        <article key={user.id} className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <Link href={`/users/${user.id}`} className="bg-blue-500 text-white px-4 py-2 rounded inline-block">
            User Details
          </Link>
        </article>
      ))}
    </section>
  );
}
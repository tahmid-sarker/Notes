import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
      <h2 className="text-xl mb-6">I am {user.displayName}</h2>

      <img
        src={user.photoURL}
        alt={user.displayName}
        className="w-70 h-70 rounded-lg object-cover shadow-md mb-4"
      />

      <div className="text-center space-y-2">
        <p>
          <span className="font-semibold">Account Created:</span>{" "}
          {new Date(user?.metadata?.creationTime).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Last Sign In:</span>{" "}
          {new Date(user?.metadata?.lastSignInTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Home;

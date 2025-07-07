import { use } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { RiMenu2Fill } from 'react-icons/ri';

const Header = () => {
    const { user, singOutUser } = use(AuthContext)
    // console.log(user)

    const handleSignOut = () => {
        singOutUser()
        .then()
        .catch((error) => console.log(error.message))
    }

    const NavLinks = user ? (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/users">Users</NavLink></li>
            <li><NavLink to="/quotes">Quotes</NavLink></li>
            <li><NavLink to="/posts">Posts</NavLink></li>
            <li><button onClick={handleSignOut}>Logout</button></li>
        </>
    ) : (
        <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    {/* Mobile Menu Button */}
                    <button tabIndex={0} className="btn btn-ghost lg:hidden">
                        <RiMenu2Fill className='h-5 w-5' />
                    </button>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {NavLinks}
                    </ul>
                </div>
                <h1 className="text-2xl font-bold">Token Based Authentication</h1>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {NavLinks}
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn">Contact</button>
            </div>
        </div>
    );
};

export default Header;
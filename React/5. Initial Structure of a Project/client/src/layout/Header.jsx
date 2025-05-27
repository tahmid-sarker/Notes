import { RiMenu2Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import logo from "../assets/logo.png";
import DarkModeToggler from "../components/shared/DarkModeToggler";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2';
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgetPassword from "../pages/auth/ForgetPassword";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 2200,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const Header = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    // Handle user logout
    const handleLogOut = () => {
        logoutUser()
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Logged out successfully!",
                });
                navigate("/");
                setDropdownOpen(false);
            })
            .catch((error) => {
                Toast.fire({
                    icon: "error",
                    title: error.message,
                });
            });
    };

    // Navigation link styles
    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-primary underline underline-offset-4"
            : "hover:text-primary hover:underline hover:underline-offset-4";

    // Navigation links
    const navLinks = <>
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink to="/jobs" className={navLinkClass}>Jobs</NavLink>
        <NavLink to="/about-us" className={navLinkClass}>About Us</NavLink>
        <NavLink to="/contact-us" className={navLinkClass}>Contact Us</NavLink>
        {user && <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>}
    </>;

    return (
        <header className="shadow-sm">
            <div className="navbar bg-base-100 w-11/12 mx-auto">
                {/* Navbar Start */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div tabIndex={0} className="flex justify-center items-center gap-2">
                            <RiMenu2Fill className="h-7 w-7 text-secondary cursor-pointer" />
                        </div>
                        <div tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box gap-1.5 z-1 mt-3 w-52 p-2 text-base shadow">
                            {navLinks}
                            {user ? (
                                <button onClick={handleLogOut} className="btn btn-primary hover:btn-secondary text-white rounded px-2 md:px-4 py-1 md:py-2 text-base">Logout</button>
                            ) : (
                                <>
                                    <button onClick={() => setActiveModal("login")} className="btn btn-ghost hover:btn-primary hover:text-white border border-primary rounded px-2 md:px-4 py-1 md:py-2 text-base">Login</button>
                                    <button onClick={() => setActiveModal("register")} className="btn btn-primary hover:btn-secondary text-white rounded px-2 md:px-4 py-1 md:py-2 text-base">Register</button>
                                </>)}
                        </div>
                    </div>
                    <Link to="/" className="flex justify-center items-center text-lg md:text-2xl font-bold">
                        <img src={logo} alt="Project Name" className="h-7 md:h-12 w-7 md:w-12" />
                        <h1 className="text-primary">Project <span className="text-secondary">Name</span></h1>
                    </Link>
                </div>

                {/* Navbar Center */}
                <div className="navbar-center hidden lg:flex">
                    <div className="menu menu-horizontal px-1 gap-4 text-base">
                        {navLinks}
                    </div>
                </div>

                {/* Navbar End */}
                <div className="navbar-end gap-2 md:gap-4">
                    {/* Dark Mode Toggler */}
                    <DarkModeToggler />
                    {/* User Login and Logout */}
                    {user ? (
                        <div className="relative">
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className='cursor-pointer'>
                                <img alt={user?.displayName} src={user?.photoURL} className="w-14 h-14 rounded-full object-cover border-2 border-primary" />
                            </button>
                            {dropdownOpen && (
                                <ul className="menu menu-sm bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow absolute right-0">
                                    <h1 className='text-lg text-center font-semibold text-gray-700'>{user?.displayName}</h1>
                                    <li><Link to="/my-profile" className='text-lg' onClick={() => setDropdownOpen(false)}>My Profile</Link></li>
                                    <li><button onClick={handleLogOut} className="btn btn-primary hover:btn-secondary text-base text-white">Logout</button></li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            {/* Login Modal */}
                            <div>
                                <button onClick={() => setActiveModal("login")} className="btn btn-ghost hover:btn-primary hover:text-white border border-primary rounded px-2 md:px-4 py-1 md:py-2 text-base hidden md:block">Login</button>
                                <Login isOpen={activeModal === 'login'} onSwitch={(modal) => setActiveModal(modal)} />
                            </div>
                            {/* Register Modal */}
                            <div>
                                <button onClick={() => setActiveModal("register")} className="btn btn-primary hover:btn-secondary text-white rounded px-2 md:px-4 py-1 md:py-2 text-base hidden md:block">Register</button>
                                <Register isOpen={activeModal === 'register'} onSwitch={(modal) => setActiveModal(modal)} />
                            </div>
                            {/* Forget Password Modal */}
                            <div>
                                <ForgetPassword isOpen={activeModal === 'forgot'} onSwitch={(modal) => setActiveModal(modal)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
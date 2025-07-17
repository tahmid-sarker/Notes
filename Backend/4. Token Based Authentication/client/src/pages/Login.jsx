import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, signInUser, forgetPassword } = useAuth();
  const emailRef = useRef();
  const location = useLocation();
  // console.log(location)
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setErrorMessage("")

    // Signin user
    signInUser(email, password)
      .then((result) => {
        //Email Verify
        // if(!result.user.emailVerified) {
        //   alert("The email you tired to login is not verified. Please check your email and verify the account.");
        //   return;
        // } else {
        //   setSuccessMessage(true)
        //   navigate(location.state || "/") // Redirect to the previous page or home page
        // }
        navigate(from)
      })
      .catch((error) => setErrorMessage(error.message))
  }

  const handleForgetPassword = () => {
    // console.log(emailRef.current)
    const email = emailRef.current.value;
    // console.log(email)

    //Send a password reset email
    forgetPassword(email)
      .then(() => {
        alert("An Email has sent to you. Reset Password Now!")
      });
  }

  // If user is already logged in, redirect to the previous page or home page
  // This is to prevent logged in user from seeing the login page again
  if (user) {
    navigate(from);
  } else {
    return (
      <div className="card bg-base-100 w-full max-w-sm mx-auto mt-7 shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label className="label">Email</label>
            <input name="email" ref={emailRef} type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} className="input" placeholder="Password" />
              <button type="button" className="btn btn-xs absolute right-6 top-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div>
              <a className="link link-hover" onClick={handleForgetPassword}>Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
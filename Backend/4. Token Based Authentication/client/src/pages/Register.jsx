import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const { user, createUser, updateUser } = useAuth();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;

    // console.log(name, photo, password, terms);

    setSuccessMessage(false);
    setErrorMessage("");

    // Password Validate
    const passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRex.test(password)) {
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
      } else if (!/[a-z]/.test(password)) {
        setErrorMessage("Password must include at least one lowercase letter.");
      } else if (!/[A-Z]/.test(password)) {
        setErrorMessage("Password must include at least one uppercase letter.");
      } else if (!/\d/.test(password)) {
        setErrorMessage("Password must include at least one digit.");
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        setErrorMessage("Password must include at least one special character.");
      } else {
        setErrorMessage("Password must meet all required conditions.");
      }
      return;
    }

    //Terms Check
    if (!terms) {
      setErrorMessage("You have to accept our terms and conditions.");
      return;
    }

    //Create Users
    createUser(email, password)
      .then(() => {
        setSuccessMessage(true);
        navigate("/")

        // Verify Email
        // sendEmailVerification(auth.currentUser)
        // .then(() => {
        //   alert("An email has sent to you. Verify Now!");
        // });

        //Update Profile
        const profile = {
          displayName: name,
          photoURL: photo,
        }
        updateUser(profile)
          .then(() => {
            console.log("Profile updated")
          })
          .catch((error) => setErrorMessage(error.message));
      })
      .catch((error) => setErrorMessage(error.message));
  };

  if (user) {
    navigate(from);
  } else {
    return (
      <div className="card bg-base-100 w-full max-w-sm mx-auto mt-7 shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label className="label">Name</label>
            <input name="name" type="text" className="input" placeholder="Name" />
            <label className="label">Photo Url</label>
            <input name="photo" type="url" className="input" placeholder="Photo URL" />
            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} className="input" placeholder="Password" />
              <button type="button" className="btn btn-xs absolute right-6 top-2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-2">
              <input type="checkbox" name="terms" onClick={() => setTerms(!terms)} />{" "}
              Accept our Terms & Conditions.
            </div>
            <button type="submit" className="btn btn-neutral mt-4">Register</button>
            {successMessage && (<p className="text-green-500">Sign Up Successfully</p>)}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>
        </div>
      </div>
    );
  }
};

export default Register;
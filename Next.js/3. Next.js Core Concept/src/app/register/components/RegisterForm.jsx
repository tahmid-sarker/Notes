"use client";

import { registerUser } from "@/app/actions/auth/registerUser";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const payload = { name, email, password };
    //console.log("Registration payload", payload);
    const result = await registerUser(payload);
    // console.log(result);
    router.push('/customers');
  };
  return (
    <>
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Name */}
        <label htmlFor="name" className="block">Name</label>
        <input className="block p-1 text-black" type="text" name="name" id="name" placeholder="Enter your name" />
        {/* Email */}
        <label htmlFor="email" className="block">Email</label>
        <input className="block p-1 text-black" type="text" name="email" id="email" placeholder="Enter your email" />
        {/* Password */}
        <label htmlFor="password" className="block">Password</label>
        <input className="block p-1 text-black" type="password" name="password" id="password" placeholder="Password" />
        <button type="submit" className="outline rounded-md p-2 cursor-pointer">Register</button>
      </form>
    </>
  );
}
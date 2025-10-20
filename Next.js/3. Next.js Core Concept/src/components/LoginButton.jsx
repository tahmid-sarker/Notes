"use client";
import React from "react";
import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button onClick={() => signIn()} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer">
      Sign In
    </button>
  );
}
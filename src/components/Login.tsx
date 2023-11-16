"use client";

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <div
        className="flex flex-col justify-center items-center p-4 rounded-2xl transition-all duration-200 ease-out cursor-pointer hover:shadow-2xl"
        onClick={() => signIn("google")}
      >
        <div className="m-4 text-3xl font-bold text-brand-white">Sign In</div>
      </div>
    </div>
  );
}

export default Login;

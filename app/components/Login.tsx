"use client";
import React from "react";

const Login = () => {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let email = e.currentTarget.email.value;
    let pass = e.currentTarget.password.value;
    // console.log(email, pass);
  }

  function handleSignUp() {
    let email = document.getElementsByName("email")[0] as HTMLInputElement;
    let pass = document.getElementsByName("password")[0] as HTMLInputElement;
  }

  return (
    <div className="container max-w-full h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center"
      >
        <h1 className="font-semibold text-[2rem]">Login</h1>
        {/* inputs with email and password names */}
        <input
          className="p-2 rounded-md border border-1 border-neutral-400"
          name="email"
          id="form-email"
          type="email"
          required
          placeholder="Enter email"
        />
        <input
          className="p-2 rounded-md border border-1 border-neutral-400"
          name="password"
          id="form-email"
          type="password"
          required
          placeholder="Enter password"
        />
        {/* button of type-submit to activate the form action */}
        <button
          type="submit"
          className="w-full outline outline-1 outline-black p-2 bg-black rounded-md text-white hover:bg-white hover:text-black duration-150"
        >
          Login
        </button>
        {/* button of type-button to not activate the form action */}
        <button
          type="button"
          onClick={handleSignUp}
          className="w-full outline outline-1 outline-neutral-400 p-2 bg-white rounded-md text-neutral-400 hover:outline-black hover:text-black duration-150"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Login;

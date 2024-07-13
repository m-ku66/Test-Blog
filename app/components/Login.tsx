"use client";
import React, { useState } from "react";
import { auth } from "../lib/firebase/client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Login = () => {
  const [loading, setloading] = useState<boolean>(false); // state to manage loading

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let email = e.currentTarget.email.value; // storing the user inputted email
    let pass = e.currentTarget.password.value; // storing the ser inputted password

    setloading(true); // starting the loading cycle

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredentials) => {
        console.log(userCredentials);
        setloading(false);
      })
      .catch((error) => {
        alert(
          `Error: ${error} has occured. Please contact the admin of this app`
        );
        setloading(false);
      }); // Use Firebase's signIn functions, log the user information, end loading cycle, and alert the client in the case of an error
  }

  function handleSignUp() {
    let email = document.getElementsByName("email")[0] as HTMLInputElement;
    let pass = document.getElementsByName("password")[0] as HTMLInputElement;

    setloading(true);

    createUserWithEmailAndPassword(auth, email.value, pass.value)
      .then((userCredentials) => {
        console.log("New user: ", userCredentials);
        setloading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        console.log(error);
        alert(
          `Error "${errorCode}: ${errorMsg}" has occured. Either contact the admin of this app or try again later...`
        );
        setloading(false);
      });
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

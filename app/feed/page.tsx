"use client";
import React, { useState } from "react";
import BlogItem from "../components/BlogItem";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { useRouter } from "next/navigation";

const FeedComponent = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const router = useRouter();

  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1];

  function handleSignout() {
    signOut(auth);
    router.push("/");
  }

  return (
    <div className="px-10 container max-w-full h-screen flex flex-col items-center">
      <div className="w-full p-5 flex justify-between">
        <h1
          onClick={handleSignout}
          className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none"
        >
          Logout
        </h1>
        <h1 className="text-[2rem] font-semibold select-none">Your Feed</h1>
        <h1 className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none">
          Create Post
        </h1>
      </div>
      <div className="px-10 w-full h-full flex flex-wrap justify-center overflow-x-hidden">
        {testArray.map((blogPost, blogPostIndex) => (
          <div key={blogPostIndex} className="m-3 cursor-pointer">
            <Link href={`/feed/${blogPostIndex}`}>
              <BlogItem />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedComponent;

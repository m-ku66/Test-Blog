"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "../components/BlogItem";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { useRouter } from "next/navigation";
import useAuth from "../lib/hooks/useAuth";
import { db } from "../lib/firebase/client";
import { collection, getDocs } from "firebase/firestore";

const FeedComponent = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const user = useAuth();
  const router = useRouter();

  console.log("User in FeedComponent:", user);

  useEffect(() => {
    console.log("useEffect called");

    if (user) {
      const fetchPosts = async () => {
        try {
          console.log("Fetching posts for user:", user?.uid);
          const postRef = collection(db, "users", user?.uid, "posts");
          const querySnapshot = await getDocs(postRef);
          const postCollection = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setBlogPosts(postCollection);
          console.log("Fetched blog posts:", postCollection);
        } catch (error) {
          console.error("Error fetching posts: ", error);
        }
      };
      fetchPosts();
    } else {
      console.log("User is null or undefined");
    }
  }, [user]);

  const handleSignout = () => {
    signOut(auth);
    router.push("/");
  };

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
        <h1
          onClick={() => router.push("/create")}
          className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none"
        >
          Create Post
        </h1>
      </div>
      <div className="px-10 w-full h-full flex flex-wrap justify-center overflow-x-hidden">
        {blogPosts.length > 0 ? (
          blogPosts.map((blogPost: any) => (
            <div key={blogPost.id} className="m-3 cursor-pointer">
              <Link href={`/feed/${blogPost.id}`}>
                <BlogItem blogPost={blogPost} />
              </Link>
            </div>
          ))
        ) : (
          <p>No blog posts available</p>
        )}
      </div>
    </div>
  );
};

export default FeedComponent;

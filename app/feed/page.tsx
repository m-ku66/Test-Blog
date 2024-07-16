"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "../components/BlogItem";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { useRouter } from "next/navigation";
import useAuth from "../lib/hooks/useAuth";
import { db } from "../lib/firebase/client";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const FeedComponent = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const user = useAuth();
  const router = useRouter();

  console.log("User in FeedComponent:", user);

  useEffect(() => {
    console.log("useEffect called");

    const fetchPosts = async () => {
      try {
        console.log("Fetching all posts");
        const postRef = collection(db, "posts"); // Query the top-level posts collection
        const q = query(postRef, orderBy("timestamp", "desc")); // Order by timestamp
        const querySnapshot = await getDocs(q);
        console.log("Query snapshot:", querySnapshot);

        if (!querySnapshot.empty) {
          const postCollection = querySnapshot.docs
            .map((doc) => {
              const data = doc.data();
              if (!data.timestamp) {
                console.warn(
                  `Document ${doc.id} is missing the timestamp field`
                );
                return null;
              }
              return {
                ...data,
                id: doc.id,
              };
            })
            .filter(Boolean);
          setBlogPosts(postCollection);
          console.log("Fetched blog posts:", postCollection);
        } else {
          console.log("No posts found");
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []); // Removed user dependency to fetch posts for all users

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

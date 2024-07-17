"use client";
import React, { useState, useEffect } from "react";
import BlogItem from "@/app/components/BlogItem";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../lib/firebase/client";
import { useRouter } from "next/navigation";
import useAuth from "../../../lib/hooks/useAuth";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

const UserFeedComponent = ({ params }: { params: { user: string } }) => {
  // State to store the blog posts of the user
  const [blogPosts, setBlogPosts] = useState<any[]>([]);

  // Get the user's email (if logged in)
  const user = useAuth();

  // Get the user's email from the URL parameter
  const userEmail = user ? decodeURIComponent(params.user) : null;

  const router = useRouter();

  // Fetch the blog posts of the user when the component mounts or when the user changes
  useEffect(() => {
    // If the user is not logged in, do not fetch the blog posts
    if (!userEmail) return;

    // Fetch the blog posts of the user
    const fetchPosts = async () => {
      console.log(`Fetching posts for user: ${userEmail}`);

      try {
        // Create a reference to the posts collection in Firestore
        const postRef = collection(db, "posts");

        // Create a query to fetch the posts of the user
        const q = query(
          postRef,
          where("author", "==", userEmail),
          orderBy("timestamp", "desc")
        );

        // Fetch the posts of the user
        const querySnapshot = await getDocs(q);

        // Map the posts to an array of objects with the id and the post data
        const postCollection = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        // Set the state with the fetched posts
        setBlogPosts(postCollection);
        console.log("Fetched blog posts: ", postCollection);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    // Call the function to fetch the posts
    fetchPosts();
  }, [userEmail]);

  // Function to handle signing out
  const handleSignout = async () => {
    try {
      // Sign out the user
      await signOut(auth);

      // Redirect the user to the login page
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Return the JSX for the component
  return (
    <div className="fade2 px-10 container max-w-full h-screen flex flex-col items-center">
      <div className="w-full p-5 flex justify-between">
        <h1
          // Handle signing out
          onClick={handleSignout}
          className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none"
        >
          Logout
        </h1>
        <div className="flex flex-col items-center gap-3">
          <h1
            // Navigate to the user's posts page
            onClick={() => router.push(`/feed/userFeed/${params.user}`)}
            className="cursor-pointer text-[2rem] font-semibold select-none"
          >
            Your Posts
          </h1>
          <h2
            // Navigate to the feed page
            onClick={() => router.push("/feed")}
            className="cursor-pointer text-[1rem] select-none text-neutral-400 hover:text-black"
          >
            Feed
          </h2>
        </div>
        <h1
          // Navigate to the create post page
          onClick={() => router.push("/create")}
          className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none"
        >
          Create Post
        </h1>
      </div>
      <div className="fade3 px-10 w-full h-full flex flex-wrap justify-start overflow-x-hidden">
        {blogPosts.length > 0 ? (
          blogPosts.map((blogPost: any) => (
            <div key={blogPost.id} className="m-3 cursor-pointer">
              <Link href={`/feed/userFeed/${userEmail}/${blogPost.id}`}>
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

export default UserFeedComponent;

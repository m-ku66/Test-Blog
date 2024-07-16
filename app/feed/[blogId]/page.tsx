"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/client";

/**
 * This component is responsible for rendering a single blog post.
 * It receives the blog post ID as a parameter and fetches the post data from the Firestore database.
 * The component displays a loading state while the post data is being fetched, and an error message if the post cannot be found.
 * If the post data is successfully fetched, it renders the post title, content, and some action buttons.
 */
const PostReadingPage = ({ params }: { params: { blogId: string } }) => {
  // State variables to store the post data, loading state, and error message
  const [post, setPost] = useState<any>(null); // The post data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error message

  // Fetch the post data from Firestore when the component mounts or when the blog post ID changes
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Create a reference to the post document in the Firestore database
        const postRef = doc(db, "posts", params.blogId);
        // Fetch the post document
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
          // If the post document exists
          setPost(postDoc.data()); // Set the post data state
        } else {
          // If the post document does not exist
          setError("No such post found"); // Set the error state
        }
      } catch (error) {
        // If an error occurs while fetching the post document
        console.error("Error fetching post: ", error); // Log the error
        setError("Error fetching post"); // Set the error state
      } finally {
        setLoading(false); // Set the loading state to false
      }
    };

    fetchPost(); // Fetch the post data
  }, [params.blogId]); // Fetch the post data when the blog post ID changes

  // Render the loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Render the post data
  return (
    <div className="container max-w-full h-screen flex flex-col items-center gap-5 p-5">
      <div className="w-full p-3 flex justify-between">
        <h1 className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none">
          <Link href={"/feed"}>Back to Feed</Link>
        </h1>
      </div>
      {post ? ( // If the post data is available
        <>
          <h1 className="text-[2rem] font-semibold select-none">
            {post.title}
          </h1>
          {/* Render the post title */}
          <div className="flex flex-col gap-10 w-[60%] min-h-fit">
            <p className="text-neutral-700">{post.content}</p>
            <p className="text-[0.7rem] text-neutral-400">{`created by: ${post.author}`}</p>
          </div>
        </>
      ) : (
        <p>No post data available</p> // If the post data is not available
      )}
    </div>
  );
};

export default PostReadingPage;

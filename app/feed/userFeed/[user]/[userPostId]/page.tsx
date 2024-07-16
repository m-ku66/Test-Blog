"use client"; // This directive indicates that the file is a client-side component in Next.js.

import React, { useState, useEffect } from "react"; // Importing React and hooks.
import Link from "next/link"; // Importing Link component for client-side navigation.
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Importing Firestore methods.
import { db } from "@/app/lib/firebase/client"; // Importing Firebase Firestore configuration.
import useAuth from "@/app/lib/hooks/useAuth"; // Importing custom hook to get user authentication data.

const UserPostReadingPage = ({
  params,
}: {
  params: { userPostId: string };
}) => {
  // Component to read and edit user posts based on post ID.

  // State variables
  const [post, setPost] = useState<any>(null); // State to store the fetched post data.
  const [loading, setLoading] = useState<boolean>(true); // State to indicate if data is still being loaded.
  const [error, setError] = useState<string | null>(null); // State to store any error messages.
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to toggle edit mode.
  const [title, setTitle] = useState<string>(""); // State to store the edited title.
  const [content, setContent] = useState<string>(""); // State to store the edited content.
  const user = useAuth(); // Hook to get the authenticated user's information.

  // Effect to fetch post data when component mounts or when the userPostId changes.
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, "posts", params.userPostId); // Reference to the post document.
        const postDoc = await getDoc(postRef); // Fetch the post document from Firestore.

        if (postDoc.exists()) {
          const postData = postDoc.data(); // Get the post data from the document.
          setPost(postData); // Set the post data to state.
          setTitle(postData.title); // Initialize title state with fetched data.
          setContent(postData.content); // Initialize content state with fetched data.
        } else {
          setError("No such post found"); // Set error if post does not exist.
        }
      } catch (error) {
        console.error("Error fetching post: ", error); // Log any errors.
        setError("Error fetching post"); // Set error state.
      } finally {
        setLoading(false); // Set loading to false once fetching is done.
      }
    };

    fetchPost(); // Call the function to fetch post data.
  }, [params.userPostId]); // Dependency array ensures the effect runs when userPostId changes.

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode.
  };

  const handleCancel = () => {
    setIsEditing(false); // Cancel edit mode without saving.
  };

  const handleSave = async () => {
    try {
      const postRef = doc(db, "posts", params.userPostId); // Reference to the post document.
      await updateDoc(postRef, {
        title, // Update the title in Firestore.
        content, // Update the content in Firestore.
      });
      setPost((prevPost: any) => ({ ...prevPost, title, content })); // Update local state with new values.
      setIsEditing(false); // Exit edit mode.
    } catch (error) {
      console.error("Error updating post: ", error); // Log any errors.
      setError("Error updating post"); // Set error state.
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading state.
  }

  if (error) {
    return <div>{error}</div>; // Render error message.
  }

  return (
    <div className="container max-w-full h-screen flex flex-col items-center gap-5 p-5">
      <div className="w-full p-3 flex justify-between">
        <h1 className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none">
          <Link href={`/feed/userFeed/${user.email}`}>Back to Your Posts</Link>
        </h1>
      </div>
      {post ? (
        <>
          {isEditing ? (
            <div className="flex flex-col gap-10 w-[60%] min-h-fit">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-[2rem] font-semibold select-none p-2"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="text-neutral-700 p-2"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="outline outline-1 outline-black p-2 bg-black rounded-md text-white hover:bg-white hover:text-black duration-150"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="outline outline-1 outline-black p-2 bg-white rounded-md text-black hover:bg-black hover:text-white duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-[2rem] font-semibold select-none">
                {post.title}
              </h1>
              <div className="flex flex-col gap-10 w-[60%] min-h-fit">
                <p className="text-neutral-700">{post.content}</p>
                <p className="text-[0.7rem] text-neutral-400">{`created by: ${post.author}`}</p>
                {post.author === user.email && (
                  <button
                    onClick={handleEdit}
                    className="outline outline-1 outline-black p-2 bg-black rounded-md text-white hover:bg-white hover:text-black duration-150"
                  >
                    Edit Post
                  </button>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <p>No post data available</p>
      )}
    </div>
  );
};

export default UserPostReadingPage;

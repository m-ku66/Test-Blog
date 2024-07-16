"use client";
import React from "react";
import Link from "next/link";
import { setDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase/client";
import useAuth from "../lib/hooks/useAuth";
import { useRouter } from "next/navigation";

const postCreationComponent = () => {
  const router = useRouter();
  const user = useAuth();

  async function createPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let postObj = {
      title: e.currentTarget["post-title"].value,
      content: e.currentTarget["post-content"].value,
      dateCreated: new Date(),
      id: new Date().getTime().toString() + "post",
      author: user?.email,
      authorId: user?.uid,
      timestamp: serverTimestamp(),
    };

    /**
     * Create a reference to what you want your db structure to look like.
     * EX:
     *
     * db + "collection name" + collection item's ID + "sub collection name"
     *                                 |
     *                                 V
     * Database => collection name => collection item => collection item's items
     */
    // const postRef = collection(db, "users", user?.uid, "posts"); // create a user table in our db and give each user a post table

    const globalPostRef = collection(db, "posts"); // create a post table in our db. It's not attached to any user, allowing multiple users to access its contents

    try {
      // await setDoc(doc(postRef), postObj); // create a data reference using postObj and add it to the collection our postRef is pointing to, then push to db
      await setDoc(doc(globalPostRef), postObj); // create a data reference using postObj and add it to the collection our global postRef is pointing to, then push to db
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/feed");
    }
  }

  return (
    <div className="container max-w-full h-screen flex flex-col items-center gap-5 p-5">
      <div className="w-full p-3 flex justify-between">
        <h1 className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none">
          <Link href={"/feed"}>Back to Feed</Link>
        </h1>
      </div>
      <form
        className="flex flex-col items-center gap-10 w-full h-full"
        onSubmit={createPost}
      >
        <h1 className="text-[2rem] font-semibold select-none">
          <input
            className="text-center outline-none"
            type="text"
            name="post-title"
            id="postTitle"
            placeholder="Enter a title"
            required
          />
        </h1>
        <hr />
        <div className=" flex flex-col gap-3 w-[60%] h-[60%]">
          <textarea
            className="p-5 resize-none w-full h-full outline outline-1 outline-neutral-400"
            name="post-content"
            id="postContent"
            placeholder="What's your post about?"
            maxLength={3000}
            required
          ></textarea>
          <button
            className="outline outline-1 outline-black p-2 bg-black rounded-md text-white hover:bg-white hover:text-black duration-150"
            type="submit"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default postCreationComponent;

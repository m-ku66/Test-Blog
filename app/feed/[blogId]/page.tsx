import React from "react";
import Link from "next/link";

const PostReadingPage = ({ params }: { params: { blogId: number } }) => {
  return (
    <div className="container max-w-full h-screen flex flex-col items-center gap-5 p-5">
      <div className="w-full p-3 flex justify-between">
        <h1 className="text-neutral-400 hover:text-black duration-150 cursor-pointer select-none">
          <Link href={"/feed"}>Back to Feed</Link>
        </h1>
      </div>
      <h1 className="text-[2rem] font-semibold select-none">
        Blog {params.blogId}
      </h1>
      <div className=" flex flex-col gap-3 w-[60%] min-h-fit">
        <p>
          This is the content of blog {params.blogId}. You'll need to refer to
          the actual object's content property when maiing this for reals. This
          is the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals. This is
          the content of blog {params.blogId}. You'll need to refer to the
          actual object's content property when maiing this for reals.
        </p>
        <div className="flex justify-between w-full min-h-fit">
          <p>Like Post</p>
          <p>Save Post</p>
        </div>
      </div>
    </div>
  );
};

export default PostReadingPage;

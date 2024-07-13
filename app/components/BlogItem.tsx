import React from "react";

const BlogItem = () => {
  return (
    <div className="relative shadow-md rounded-md p-5 flex flex-col gap-5 w-[300px] h-[400px] outline outline-1 outline-neutral-400 hover:outline-black duration-150 overflow-hidden">
      <div className="absolute z-[5] w-full h-full bg-gradient-to-t from-white/[0.8] to-white/[0]"></div>
      <h1 className="text-[1.2rem] font-semibold">
        A Pretty Long Blog Post Title For Testing Purposes
      </h1>
      <p className="text-[1rem] text-neutral-700">
        Blog post content. This will be whatever the user writes it out to be.
        It's hard coded now, but will be dynamic later on.Blog post content.
        This will be whatever the user writes it out to be. It's hard coded now,
        but will be dynamic later on.Blog post content. This will be whatever
        the user writes it out to be. It's hard coded now, but will be dynamic
        later on.Blog post content. This will be whatever the user writes it out
        to be. It's hard coded now, but will be dynamic later on.Blog post
        content. This will be whatever the user writes it out to be. It's hard
        coded now, but will be dynamic later on.Blog post content. This will be
        whatever the user writes it out to be. It's hard coded now, but will be
        dynamic later on.
      </p>
    </div>
  );
};

export default BlogItem;

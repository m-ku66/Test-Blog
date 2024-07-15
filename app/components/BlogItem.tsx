import React from "react";

type PostProps = {
  blogPost: any;
};

const BlogItem: React.FC<PostProps> = ({ blogPost }) => {
  return (
    <div className="relative shadow-md rounded-md p-5 flex flex-col gap-5 w-[300px] h-[400px] outline outline-1 outline-neutral-400 hover:outline-black duration-150 overflow-hidden">
      <div className="absolute z-[5] w-full h-full bg-gradient-to-t from-white/[0.8] to-white/[0]"></div>
      <h1 className="text-[1.2rem] font-semibold">{blogPost.title}</h1>
      <p className="text-[1rem] text-neutral-700">{blogPost.content}</p>
    </div>
  );
};

export default BlogItem;

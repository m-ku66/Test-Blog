"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container max-w-full h-screen px-10 py-5">
      <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
        <h1 className="text-[2rem] font-semibold">Welcome to my blog app</h1>
        <button
          onClick={() => router.push("/feed")}
          className="outline outline-1 outline-black p-2 bg-black rounded-md text-white hover:bg-white hover:text-black duration-150"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

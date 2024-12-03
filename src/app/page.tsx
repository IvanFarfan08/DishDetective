"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export default function Home() {
  return (
    <HeroSection />
  );
}

export function HeroSection() {
  const words = [
    {
      text: "Click",
    },
    {
      text: "button",
    },
    {
      text: "to",
    },
    {
      text: "start",
    },
    {
      text: "ordering",
    },
    {
      text: "food.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Feeling hungry?
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href="/order">
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Begin
          </button>
        </Link>
      </div>
    </div>
  );
}

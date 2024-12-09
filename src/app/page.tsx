"use client";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Images/BcFood.jpg')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
      </div>
    </div>
  );
}

export function HeroSection() {
  const words = [
    { text: "Click", className: "text-white" },
    { text: "button", className: "text-white" },
    { text: "to", className: "text-white" },
    { text: "start", className: "text-white" },
    { text: "ordering", className: "text-white" },
    {
      text: "food.",
      className: "text-purple-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem] text-center">
      {/* New headline */}
      <p className="text-white text-lg sm:text-2xl font-bold mb-4">
        Welcome to our AI-enhanced food recognition restaurant!
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-6">
        <Link href="/order">
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
              Begin
            </div>
          </button>
        </Link>
      </div>
      <div className="fixed bottom-8 right-8">
        <Link href="/admin">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
          >
            <span>Admin Panel</span>
          </HoverBorderGradient>
        </Link>
      </div>
    </div>
  );
}

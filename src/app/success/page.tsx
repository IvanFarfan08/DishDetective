"use client";
import React from "react";
import { WavyBackground1 } from "@/components/ui/wavy-background1";
import Link from "next/link";

export default function Success() {
  return (
    <WavyBackground1 
      className="max-w-4xl mx-auto pb-40"
      colors={[
        "#10b981", // Emerald green
        "#34d399", // Light emerald
        "#6ee7b7", // Light teal
        "#4ade80", // Lime green
        "#16a34a", // Bold green
      ]}
    >
      <h1 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Order Successfully Processed
      </h1>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        Thank you for your payment! Enjoy your food!
      </p>

      {/* Button for New Order */}
      <div className="flex justify-center mt-8">
        <Link href="/">
          <button className="p-[3px] relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-lg"></div>
            <div className="px-8 py-2 bg-black rounded-[6px] relative text-white font-medium transition duration-200 group-hover:bg-transparent">
              New Order
            </div>
          </button>
        </Link>
      </div>
    </WavyBackground1>
  );
}

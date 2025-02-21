"use client";
import React from "react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-10 bg-[#4A5568] text-white flex items-center pl-5 fixed top-0 left-0 w-full z-50 border-b border-[#4A5568]">
      <Image src="/logo.png" alt="Logo" width={80} height={40} className="mr-2" />
      <p className="text-sm">Robotics Society, PEC</p>
    </header>
  );
}

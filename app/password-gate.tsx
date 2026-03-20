"use client";

import Image from "next/image";
import { useState } from "react";

const PASSWORD = "wins";

export function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.toLowerCase().trim() === PASSWORD) {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <Image
        src="/cadence-header.jpg"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center gap-4 px-6">
        <Image
          src="/logo.png"
          alt="Open Residency"
          width={200}
          height={24}
          className="h-6 w-auto mb-2 brightness-0 invert"
          priority
        />
        <p className="text-white/60 text-sm font-medium tracking-wide">Enter password to continue</p>
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Password"
          autoFocus
          className={`w-64 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md border text-white text-sm text-center placeholder:text-white/40 outline-none transition-colors ${
            error ? "border-red-400" : "border-white/20 focus:border-white/50"
          }`}
        />
        <button
          type="submit"
          className="px-8 py-2.5 rounded-full bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

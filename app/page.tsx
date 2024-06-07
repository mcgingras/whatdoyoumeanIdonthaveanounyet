"use client";
import { useState } from "react";
import Progress from "@/components/Progress";
import AddressInput from "@/components/AddressInput";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-neutral-100">
      <div className="border border-neutral-200 p-6 rounded w-[600px] bg-white">
        <div className="flex flex-col mb-6">
          <label className="text-sm text-neutral-500 mb-1">Address</label>
          {/* <input
          type="text"
          className="w-full p-2 border border-neutral-200 rounded mb-6"
          placeholder="Enter your address"
          onChange={(e) => setAddress(e.target.value)}
        /> */}
          <AddressInput value={address || ""} setValue={setAddress} />
        </div>
        <Progress address={address as `0x${string}`} />
      </div>
    </main>
  );
}

"use client";
import { useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { base } from "wagmi/chains";

const BASE_NOUNS_TOKEN_ADDRESS = "0x0a93a7BE7e7e426fC046e204C44d6b03A302b631";
const UNITS_REQUIRED = 1000000;

const Progress = ({ address }: { address: `0x${string}` }) => {
  const { data } = useReadContract({
    chainId: base.id,
    address: BASE_NOUNS_TOKEN_ADDRESS,
    abi: [
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
      },
    ] as const,
    functionName: "balanceOf",
    args: [address as `0x${string}`],
  });

  const balance = parseFloat(formatUnits(data || BigInt(0), 18));
  const percentage = (balance / UNITS_REQUIRED) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm  text-blue-500">
          {balance.toFixed(2)} / {UNITS_REQUIRED} $nouns
        </span>
        <span className="text-sm text-blue-500 ">{percentage.toFixed(2)}%</span>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-4">
        <div
          className="bg-blue-500 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;

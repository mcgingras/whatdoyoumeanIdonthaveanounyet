import { useEnsAddress, useEnsName } from "wagmi";
import { isAddress } from "viem";

const AddressInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (name: string) => void;
}) => {
  const { data: ensAddress, error } = useEnsAddress({
    chainId: 1,
    name: value?.trim(),
  });

  const { data: ensName, error: ensError } = useEnsName({
    chainId: 1,
    address: value?.trim() as `0x${string}`,
  });

  console.log(ensAddress);
  console.log(ensName);
  console.log(error);
  console.log(ensError);

  const buildHint = () => {
    if (isAddress(value)) {
      if (ensName != null)
        return (
          <>
            Primary ENS name: <span>{ensName}</span>
          </>
        );
    }

    if (ensAddress != null) return ensAddress;
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      console.log("pre");
      console.log(value);
      event.preventDefault();
      if (!isAddress(value) && ensAddress != null) {
        setValue(ensAddress);
      }
    }
  };

  return (
    <>
      <input
        type="text"
        className="border bg-agora-stone-50 border-agora-stone-100 placeholder:text-agora-stone-500 p-2 rounded-lg w-full"
        placeholder="0x..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (!isAddress(value) && ensAddress != null) {
            setValue(ensAddress);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <p className="text-xs text-neutral-500 mt-1">{buildHint()}</p>
    </>
  );
};

export default AddressInput;

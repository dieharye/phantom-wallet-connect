import Image from "next/image";

export default function Spinner() {
  return (
    <div className="relative w-4 aspect-square z-50">
      <Image src="/spinner/spinner.gif" fill alt="" />
    </div>
  );
}

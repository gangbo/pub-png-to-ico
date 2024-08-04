import Image from "next/image";
import PngToIcoConverter from "@/app/PngToIcoConverter";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between md:p-24">

        <PngToIcoConverter/>
      </main>
  );
}

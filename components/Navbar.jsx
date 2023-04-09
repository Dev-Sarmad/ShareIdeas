import Link from "next/link";

export default function Navbar() {
  return <nav className="flex justify-between py-10">
   <Link href="/">
   <button className="bg-black text-white text-2xl font-medium px-4">Share ideas</button>
   </Link>
   <ul className="flex items-center">
    {/* this will redirectes to the pages/auth/login */}
    <Link href={"/auth/login"}>
    <button className="text-white bg-green-600 rounded font-bold">Join Now</button>
    </Link>
   </ul>
  </nav>;
}

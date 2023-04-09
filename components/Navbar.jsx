import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user, loading] = useAuthState(auth);
  console.log(user);
  return (
    <nav className="flex justify-between py-10">
      <Link href="/">
        <button className="bg-black text-white text-2xl font-medium px-4">
          Share ideas
        </button>
      </Link>
      <ul className="flex items-center">
        {/* this will redirectes to the pages/auth/login */}
        {!user && (
          <Link href={"/auth/login"}>
          <button className="text-white bg-green-600 rounded font-bold">
            Join Now
          </button>
        </Link>
        )}
        {user && (
          <div className="flex items-center gap-5">
            <Link href="/post">
            <button className="text-white bg-green-600 px-4 font-sans text-xl rounded">Post</button>
            </Link>
            <Link href={'/dashboard'}>
            <img src={user.photoURL} alt="" className="w-12 rounded-full " />
              {/* <h1 className="font-medium capitalize cursor-pointer">Dashboard</h1> */}
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}

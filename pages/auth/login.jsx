import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";

export default function Login() {
    const route = useRouter()
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        route.redirect("/")
      } catch(error) {
        console.log(error);
      }
    };
  return (
    <div className="rounded p-10 shadow-xl text-center mt-32 text-gray-700 items-center">
      <h2 className="font-medium text-3xl">Join Now</h2>
      <div className="mt-3">
        <h3>Join with one provider</h3>
        <button
          onClick={googleLogin}
          className="rounded py-2 mt-2 bg-blue-500 text-white font-bold px-5"
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

export default function Login() {
  // provides the user(auth) is logged in or not
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  //   it runs everytime when the user is changed/logged in/logged out
  useEffect(() => {
    if (user) {
      route.push("/");
    } else {
      console.log("login");
    }
  }, [user]);
  
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

import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  const route = useRouter();
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  const submitPost = async (e) => {
    if (!post.description) {
      toast.error("Kindly fill the description",{
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (post.description.length>300) {
      toast.error("too long",{
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    e.preventDefault();
    const collref = collection(db, "posts");
    await addDoc(collref, {
      ...post,
      user: user.uid,
      avatar: user.photoURL,
      timestamp: serverTimestamp(),
      username: user.displayName,
    });
    setPost({ description: "" });
    return route.push("/");
  };
  return (
    <div className="max-w-md mx-auto my-10 shadow-xl rounded-lg p-12">
      <form action="" onSubmit={submitPost}>
        {post.description}
        <h1 className="text-2xl font-sans font-bold ">Create a Post</h1>
        <div>
          <h2 className="text-md text-gray-500">description</h2>
          <textarea
            className="bg-slate-800 mt-5 h-48 w-full"
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          ></textarea>
          <p
            className={`text-green-600 ${
              post.description.length > 300 ? "text-red-500" : ""
            }`}
          >
            {post.description.length}/300
          </p>
          <button
            type="submit"
            className="rounded text-white w-full my-2 bg-green-600 py-2"
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}

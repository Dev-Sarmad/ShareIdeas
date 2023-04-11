import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  const route = useRouter();
  const [post, setPost] = useState({ description: "" });
  const [user, loading] = useAuthState(auth);
  // the data for the uppdation of post comming from dashboard
  const updatedPost = route.query;

  const submitPost = async (e) => {
    if (!post.description) {
      toast.error("Kindly fill the description", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("too long", {
        autoClose: 1500,
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    e.preventDefault();
    // If the user have the id or want to change the description update on submit otherwise create a new one post
    // post present in firebase
    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      // whatever in the post now update the description
      const updatedDescription = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedDescription);
      // after updation push back to home page
      return route.push("/");
    } else {
      // creating the new post
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
    }
  };
  // checking the user
  const checkUser = async () => {
    if (!user) route.push("/auth/login");
    if (loading) return;
    if (updatedPost.id) {
      setPost({ description: updatedPost.description, id: updatedPost.id });
    }
  };
  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="max-w-md mx-auto my-10 shadow-xl rounded-lg p-12">
      <form action="" onSubmit={submitPost}>
        <h1 className="text-2xl font-sans font-bold ">
          {post.hasOwnProperty("id") ? "Edit the Post" : "Create Post"}
        </h1>
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

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Message from "@/components/Message";
import Link from "next/link";
export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  //   basically this is the function which gather the data about the logged user it checks if the user is logged out
  // then redirects to the login page and hide the dashboard from it. and it run  when the component mount useEffect
  //  see if the user is logged out
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
    const collref = collection(db, "posts");
    const q = query(collref, where("user", "==", user.uid));
    // onsnapshot updates the data in realtime
    const data = onSnapshot(q, (snapshot) => {
      // map return an array and we are passing the individual doc in it as an object,
      setPosts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      return data;
    });
  };
  // deleting the post
  const deletePost = async (id) => {
    const docRef = doc(db, "posts", id);
    await deleteDoc(docRef);
  };
  useEffect(() => {
    getData();
    // when the user change then getData is called.
  }, [user, loading]);
  return (
    <div>
      <h1>Your post</h1>
      <div>
        {posts.map((post) => (
          <Message {...post} key={post.id}>
            <div className="flex gap-3 mt-3">
              <Link href={{pathname:'/post', query:post}}>
              <button className="bg-green-600 px-4 text-white">Edit</button>
              </Link>
              <button
                onClick={() => deletePost(post.id)}
                className="bg-red-600 px-4 text-white"
              >
                Delete
              </button>
            </div>
          </Message>
        ))}
        <button
          className="bg-gray-600 text-white px-4 "
          onClick={() => auth.signOut()}
        >
          signout
        </button>
      </div>
    </div>
  );
}

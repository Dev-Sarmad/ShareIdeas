import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
export default function Dashboard() {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);
//   basically this is the function which gather the data about the logged user it checks if the user is logged out
// then redirects to the login page and hide the dashboard from it. and it run  when the component mount useEffect 
//  see if the user is logged out
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
  };
  useEffect(() => {
    getData();
    // when the user change then getData is called.
  }, [user, loading]);
  return (
    <div>
      <h1>Your post</h1>
      <div>
        <h2>your post</h2>
        <button onClick={() => auth.signOut()}>signout</button>
      </div>
    </div>
  );
}

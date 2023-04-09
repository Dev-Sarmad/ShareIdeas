import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className=" max-h-screen md:mx-auto md:max-w-2xl ">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

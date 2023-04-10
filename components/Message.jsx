export default function Message({ children, avatar, username, description }) {
  return (
    <div className="bg-white p-8 rounded-lg boder-b-2">
      <div className="flex items-center gap-3">
        <img src={avatar} alt="" className="w-12 rounded-full" />
        <h2>{username}</h2>
        </div>
        <p className="mt-3">{description}</p>
        {children}
      </div>
    
  );
}

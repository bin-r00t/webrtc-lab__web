import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Entry() {
  const codeRef = useRef("123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleJoin() {
    if (!codeRef.current.value?.trim()) return alert("Please input room ID");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    navigate(`/chat/${codeRef.current.value?.trim()}`);
  }
  return (
    <div className="h-full grid place-content-center relative">
      {loading && (
        <h2 className="absolute top-1/4 left-1/2 -translate-x-1/2 loading text-3xl text-white font-semibold text-center animate-pulse">
          Connectting......
        </h2>
      )}
      <div className="form p-5 rounded flex flex-col gap-5">
        <h1 className="text-white text-2xl select-none">
          Please input your invite ID:
        </h1>
        <input
          ref={codeRef}
          type="text"
          placeholder="Room ID"
          className="p-2 px-5 rounded-3xl outline-none text-gray-600"
        />
        <button
          onClick={handleJoin}
          className="bg-blue-600 shadow-md text-white rounded-full p-2 transition hover:bg-blue-500 cursor-pointer"
        >
          Join
        </button>
      </div>
    </div>
  );
}

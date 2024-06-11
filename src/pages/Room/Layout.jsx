import { useParams } from "react-router-dom";
import { useEffect, useRef, useState, useContext } from "react";
import { Modal } from "../../components/Modal";
import VideoWrapper from "./VideoWrapper";
import VideoActions from "./Actions";
import { initSocket, registerMoreEvents } from "../../utils/socket";
import { GlobalContext } from "../../App";
import ParticipantsList from "./ParticipantsList";
import { useDispatch, useSelector } from "react-redux";

export default function Room() {
  const dispatch = useDispatch();
  const { socket, saveSocket } = useContext(GlobalContext);
  const { roomId } = useParams();
  const dialogRef = useRef();
  const nameRef = useRef();
  const [username, setName] = useState({
    value: "",
    error: null,
  });

  useEffect(() => {
    if (username.value == "") {
      dialogRef.current.open();
    }
    const socket = initSocket(
      "https://10.168.1.141:8000",
      { token: roomId },
      dispatch
    );
    registerMoreEvents(socket);
    saveSocket(socket);
  }, []);

  function handleSetName() {
    const name = nameRef.current.value;
    if (!name) {
      setName((prev) => ({
        ...prev,
        error: true,
      }));
      return;
    }
    setName(() => ({ error: null, value: name }));
    dialogRef.current.close();
    //
    if (socket.current) {
      socket.current.emit("user:setName", name);
    }
  }

  return (
    <>
      <div className="room h-full bg-gray-800 text-white flex flex-col">
        <div className="tool-bar flex gap-8 items-center">
          <h1 className="p-5 rounded flex gap-5 text-gray-400">
            <strong>当前房间: </strong>
            <span>{roomId}</span>
          </h1>
          <h1 className="p-5 rounded flex gap-5 text-gray-400">
            <strong>你的名字: </strong>
            <span>{username.value}</span>
          </h1>
        </div>
        <VideoWrapper />
        <VideoActions />
      </div>
      <ParticipantsList />
      <Modal
        ref={dialogRef}
        show={!username.value}
        className="fixed min-w-96 flex flex-col gap-5"
      >
        <h1 className="text-xl select-none">给自己取一个好听的名字吧!</h1>
        <div className="flex flex-col gap-3">
          <input
            ref={nameRef}
            type="text"
            className="p-2 rounded-lg outline-none bg-gray-100 text-gray-700"
          />
          {username.error && (
            <p className="error-msg text-xs text-red-500">* 来将请留下姓名</p>
          )}
        </div>
        <div className="btn-group text-right">
          <button
            onClick={handleSetName}
            className="bg-indigo-500 text-white p-2 px-7 rounded-3xl transition hover:bg-indigo-400"
          >
            就它了!
          </button>
        </div>
      </Modal>
    </>
  );
}

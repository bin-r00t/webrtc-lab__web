import { Outlet } from "react-router-dom";
import "./App.css";

import { createContext, useCallback, useRef } from "react";
export const GlobalContext = createContext({
  socket: null,
  localVideoRef: null,
  remoteVideoRef: null,
  saveSocket: () => {},
});

function App() {
  // save socket
  const socket = useRef(null);
  // save video refs
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  // helper functions
  const saveSocket = useCallback(function saveSocket(s) {
    console.log('[App] save socket', s);
    socket.current = s;
  }, []);
  // const loadLocalVideo = useCallback(function loadLocalVideo(stream) {})

  return (
    <GlobalContext.Provider
      value={{ socket, localVideoRef, remoteVideoRef, saveSocket }}
    >
      <div className="h-screen bg-slate-200 bg-gradient-to-br from-slate-600 to-slate-300">
        <Outlet />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

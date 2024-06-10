import { Outlet } from "react-router-dom";
import "./App.css";

import { createContext, useCallback, useRef } from "react";
export const SocketContext = createContext({
  socket: null,
  saveSocket: () => {},
});

function App() {
  const socket = useRef(null);
  const saveSocket = useCallback(function saveSocket(s) {
    socket.current = s;
  }, []);

  return (
    <SocketContext.Provider value={{ socket, saveSocket }}>
      <div className="h-screen bg-slate-200 bg-gradient-to-br from-slate-600 to-slate-300">
        <Outlet />
      </div>
    </SocketContext.Provider>
  );
}

export default App;

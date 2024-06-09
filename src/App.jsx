import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="h-screen bg-slate-200 bg-gradient-to-br from-slate-600 to-slate-300">
      <Outlet />
    </div>
  );
}

export default App;

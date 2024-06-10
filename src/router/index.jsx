import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Join from "../pages/Entry.jsx";
import Room from "../pages/Room/Layout.jsx";
import GlobalErrorPage from "../pages/GlobalErrorPage.jsx";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <GlobalErrorPage />,
    children: [
      {
        index: true,
        // path: "join",
        element: <Join />,
      },
      {
        path: "chat/:roomId",
        element: <Room />,
      },
    ],
  },
]);

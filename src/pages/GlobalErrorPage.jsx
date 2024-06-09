import { useRouteError } from "react-router-dom";

export default function GlobalErrorPage() {
  const error = useRouteError();
  console.log("error", error);
  return (
    <div className="global-error-page bg-slate-200 h-screen grid place-content-center">
      <div className="error-box flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">{error.status}</h1>
        <p>{error.statusText}</p>
        <p className="italic text-sm text-gray-500">{error.data}</p>
      </div>
    </div>
  );
}

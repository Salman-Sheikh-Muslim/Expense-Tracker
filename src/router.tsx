import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Layout from "./Layout";
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default router;

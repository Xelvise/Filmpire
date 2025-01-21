import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./ErrorPage";
import { Actors, MovieInfo, Movies, Profile } from "./components";
import Approved from "./auth/ApprovalPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Movies /> },
            { path: "/movie/:id", element: <MovieInfo /> },
            { path: "/actors/:id", element: <Actors /> },
            { path: "/profile/:id", element: <Profile /> },
        ],
    },
    {
        path: "/approved",
        element: <Approved />,
    },
]);

export default router;

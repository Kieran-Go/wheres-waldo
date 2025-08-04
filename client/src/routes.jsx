import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },
]
export default routes;
import Home from "./components/Home";
import Scene from "./components/Scene";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
    },

    {
        path: '/scene/:id',
        element: <Scene />,
        errorElement: <ErrorPage />
    },
]
export default routes;
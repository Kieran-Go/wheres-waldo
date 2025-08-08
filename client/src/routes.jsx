import App from "./components/App";
import Home from "./components/Home";
import Scene from "./components/Scene";
import Leaderboard from "./components/Leaderboard";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'scene/:id',
        element: <Scene />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
    ],
  },
];

export default routes;
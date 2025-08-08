import { Outlet, useLocation } from "react-router-dom";
import { useEffect, createContext } from "react";
import useFetchData from "../hooks/useFetchData";
import Loading from "./Loading";

export const DataContext = createContext(null);

export default function App() {
  const location = useLocation();
  const serverOrigin = import.meta.env.VITE_SERVER_ORIGIN;

  // Fetch scene data
  const { data: scenes, loading, error } = useFetchData(`${serverOrigin}/scenes`);

  // Scroll to top of page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) return <Loading message="Loading scene data..."/>
  if (error) throw error;


  return (
    <DataContext.Provider value={{ scenes }}>
      <Outlet />
    </DataContext.Provider>
  );
}
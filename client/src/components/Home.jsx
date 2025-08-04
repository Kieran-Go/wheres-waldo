import { useEffect } from "react";
import HomeHeader from "./HomeHeader";

export default function Home() {
  // Change document title
  useEffect(() => {
    document.title = "Where's Waldo?";
  }, []);

  return (
    <>
      <HomeHeader />
    </>
  )
}
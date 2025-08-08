import { useEffect, useState } from 'react';

function useFetchData(url) {
  const [data, setData] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State to track if the fetch is still in progress
  const [error, setError] = useState(null); // State to hold any error that occurs during the fetch

  // useEffect runs once when the compoonent mounts or whenever the url changes
  useEffect(() => {
    // Send fetch request using the provided url
    fetch(url)
  .then((res) => {
    // If response fails, handle it as an error
    if (!res.ok) {
      return res.json().then((body) => {
        const error = new Error(body.message || 'Fetch failed');
        error.status = res.status;
        throw error;
      });
    }
    // If response succeeds, parse the JSON body
    return res.json();
  })
  // Set the fetched data into state
  .then((data) => {
    setData(data);
    setLoading(false); // Set loading as false
  })
  // Handle any errors during fetch or parsing
  .catch((err) => {
    setError(err);
    setLoading(false);
  });
  }, [url]); // Re-run effect only if the URL changes

  // Return the data that was fetched, along with the loading and error status
  return { data, loading, error };
}

export default useFetchData;
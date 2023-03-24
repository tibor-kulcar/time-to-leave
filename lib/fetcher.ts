const fetcher = async (...args: [string, RequestInit?]) => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
};

export default fetcher;

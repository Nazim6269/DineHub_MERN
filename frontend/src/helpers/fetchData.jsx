const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3333";

export const fetchData = async () => {
 const res = await fetch(`${SERVER_URL}/food`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 });

 if (!res.ok) {
  throw new Error(`Failed to fetch data: ${res.status}`);
 }

 const data = await res.json();
 return data;
};

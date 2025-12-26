export const fetchData = async () => {
  const res = await fetch("http://localhost:3333/food", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};

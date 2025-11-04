const API_BASE_URL = "http://localhost:3001";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

export const fetchData = async <T>(url: string, method: Method = "GET", body?: T) => {
  const fullUrl = `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...{ body: body && JSON.stringify(body) },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

import {getToken} from "./authenticate";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// async function fetchWithAuth(endpoint, method = "GET") {
//   const res = await fetch(`${API_URL}${endpoint}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getToken()}`
//     }
//   });

//   return res.status === 200 ? await res.json() : [];
// }

// export async function addToFavourites(id) {
//   return await fetchWithAuth(`/favourites/${id}`, "PUT");
// }

// export async function removeFromFavourites(id) {
//   return await fetchWithAuth(`/favourites/${id}`, "DELETE");
// }

// export async function getFavourites() {
//   return await fetchWithAuth("/favourites");
// }

// export async function addToHistory(id) {
//   return await fetchWithAuth(`/history/${id}`, "PUT");
// }

// export async function removeFromHistory(id) {
//   return await fetchWithAuth(`/history/${id}`, "DELETE");
// }

// export async function getHistory() {
//   return await fetchWithAuth("/history");
// }


export const addToFavourites = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};

export const removeFromFavourites = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};

export const getFavourites = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};

// History functions (similar structure)
export const addToHistory = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};

export const removeFromHistory = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};

export const getHistory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  if (res.status === 200) {
    return await res.json();
  } else {
    return [];
  }
};
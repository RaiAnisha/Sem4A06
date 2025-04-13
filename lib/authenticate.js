
//import jwtDecode from 'jwt-decode';
const AUTH_TOKEN_KEY='auth_token';

  export const setToken = (token) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
      } catch (error) {
        console.error('Error saving token:', error);
      }
    }
  };

  export const getToken = () => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
      } catch (error) {
        console.error('Error reading token:', error);
        return null;
      }
    }
    return null;
  };

  export const removeToken = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(AUTH_TOKEN_KEY);
      } catch (error) {
        console.error('Error removing token:', error);
      }
    }
  };

export const readToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error decoding token:', error);
    removeToken();
    return null;
  }
};

export const isAuthenticated = () => {
  return !!readToken();
};
export async function authenticateUser(userName, password) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({ userName,password }),
      headers: {'content-type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(await res.text() || 'Authentication failed');
    }
  
    const data = await res.json();
  
    if (res.status === 200) {
      setToken(data.token);
      return data.user;
    } else {
      throw new Error(data.message);
    }
  }
  export async function registerUser(userName, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password, password2 }),
    });
  
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(await res.text());
    }
  }
  
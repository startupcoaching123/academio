import axios from 'axios';
const BACKENDURL = import.meta.env.VITE_BACKEND_URL;

export const validateSession = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await axios.get(`${BACKENDURL}/api/admin/auth/validate`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Session valid for admin:', response);
    return response.data.valid;
  } catch (error) {
    // Handle specific error cases
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return false;
  }
};
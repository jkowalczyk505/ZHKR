import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const RequireAuth = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // null = loading
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/api/auth/me`, { withCredentials: true });
        setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <main className="page">
        <Spinner />
      </main>
    );
  }

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default RequireAuth;

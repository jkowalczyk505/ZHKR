import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      navigate("/admin");
    } catch (err) {
      setError("Błędny login lub hasło");
    }
  };

  return (
    <div className="form-container page">
      <div className="form-box">
        <h2>Logowanie administratora</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Login"
          />
          <input
            type="password"
            className="form-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
          />
          {error && <p className="form-error">{error}</p>}
          <Button type="submit" variant="primary">
            Zaloguj
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

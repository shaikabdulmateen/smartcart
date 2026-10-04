import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();

    api
      .post("/users/register/", {
        username,
        email,
        password,
      })
      .then(() => {
        alert("Registration successful!");

        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration failed:", error);

        const errors = error.response?.data;

        if (errors?.username) {
          alert(errors.username[0]);
        } else if (errors?.email) {
          alert(errors.email[0]);
        } else if (errors?.password) {
          alert(errors.password[0]);
        } else {
          alert("Registration failed. Please try again.");
        }
      });
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button type="submit">
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}

export default Register;
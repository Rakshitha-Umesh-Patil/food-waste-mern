import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(form);
    console.log("LOGIN RESPONSE:", res.data);

    // ✅ handle any backend structure
    const user =
      res.data.data ||      // Case B
      res.data.user ||      // sometimes
      res.data;             // Case C

    const userId = user._id || res.data.userId;
    const role = user.role || res.data.role;

    if (!userId || !role) {
      alert("Login response format incorrect from backend");
      return;
    }

    // ✅ store properly
    localStorage.setItem(
      "user",
      JSON.stringify({ _id: userId, role })
    );

    alert("Login Success ✅");

    if (role === "institute") {
      navigate("/institute-dashboard");
    } else if (role === "ngo") {
      navigate("/ngo-dashboard");
    } else {
      navigate("/");
    }

  } catch (err) {
    alert("Login Failed ❌");
    console.error(err.response?.data || err.message);
  }
};
  return (
    <div className="login-wrapper">

      <h2 className="login-title">🍱 Food Waste System</h2>
      <p style={{ color: "white" }}>Login to continue</p>

      <form className="login-card" onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Login</button>

      </form>

      <div className="login-footer">
        Don’t have an account? Register first
      </div>

    </div>
  );
}
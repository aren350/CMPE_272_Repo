import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Use Auth0's email field directly, fallback to sub if email is missing
      const email = user.email || user.preferred_username || user.name || user.nickname || user.sub || "";
      console.log("EMAIL", email)
      if (email) {
        localStorage.setItem("username", email);
        // Set role based on email
        const adminEmails = ["admin@email.com", "techtonic@email.com"];
        const userRole = adminEmails.includes(email) ? "admin" : "user";
        setRole(userRole);
        localStorage.setItem("role", userRole);
        console.log("username:", email);
        console.log("role:", userRole);
        // Print username/email after login
        console.log(`Logged in as: ${email}`);
        // Navigate after login
        navigate("/tickets/");
      } else {
        // If no email or identifier, clear username
        localStorage.removeItem("username");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <div>
          <p>Welcome, {user.name || user.email}</p>
          <p>Role: {role}</p>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <button
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/dashboard")}
          >
            Proceed to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;

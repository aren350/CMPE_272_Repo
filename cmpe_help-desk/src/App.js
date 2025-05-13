import logo from "./logo.svg";
import "./App.css";
import { Entry } from "./page/entry/Entry.page";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Dashboard } from "./page/entry/dashboard/Dashboard.page";
import SubmitTicketPage from "./components/add-ticket-form/AddTicketForm.comp";
import TicketLists from "./page/ticket-listing/TicketLists.page";
import { Ticket } from "./page/entry/ticket/Ticket.page";
import Signup from "./components/signup/Signup";
import CreateAIPage from "./components/ai-form/ai-form";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import { PrivateRoute } from "./components/private-route/PrivateRoute.comp";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user } =
    useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f8fa",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
            padding: "2.5rem 2rem",
            minWidth: 340,
            textAlign: "center",
          }}
        >
          <img
            src={require("./logo.svg").default}
            alt="Help Desk Logo"
            style={{ width: 64, height: 64, marginBottom: 24 }}
          />
          <h2 style={{ marginBottom: 16, color: "#007bff", fontWeight: 700 }}>
            Welcome to Help Desk
          </h2>
          <p style={{ marginBottom: 32, color: "#555" }}>
            Sign in with your SSO credentials to access the platform.
          </p>
          <button
            onClick={() => loginWithRedirect()}
            style={{
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "0.75rem 2rem",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 1,
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
          >
            Log In with SSO
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log In with SSO</button>
      ) : (
        <div className="App">
          <Routes>
            <Route path="/" element={<Entry />} />
            <Route element={<DefaultLayout />}>
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/add-ticket"
                element={
                  <PrivateRoute>
                    <SubmitTicketPage />
                  </PrivateRoute>
                }
              />

              <Route
                path="/tickets"
                element={
                  <PrivateRoute>
                    <TicketLists />
                  </PrivateRoute>
                }
              />

              <Route
                path="/ticket/:tid"
                element={
                  <PrivateRoute>
                    <Ticket />
                  </PrivateRoute>
                }
              />

              <Route
                path="/signup"
                element={
                  <PrivateRoute>
                    <Signup />
                  </PrivateRoute>
                }
              />

              <Route
                path="/ai-form"
                element={
                  <PrivateRoute>
                    <CreateAIPage />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;

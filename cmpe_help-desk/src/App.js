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

  // Example: Protect routes or show login button
  // You can further wire this into your routing and header
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
